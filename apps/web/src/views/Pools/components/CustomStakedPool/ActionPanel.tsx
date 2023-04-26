import styled, { keyframes, css } from 'styled-components'
import { Box, Flex, Text, LinkExternal, useToast, useModal, Skeleton, Balance } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import { Token } from '@pancakeswap/sdk'
import { FC, ReactNode, useCallback, useEffect, useState } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { useNikaStakingContract, useTokenContract } from 'hooks/useContract'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { MaxUint256 } from '@ethersproject/constants'
import { ToastDescriptionWithTx } from 'components/Toast'
import useCatchTxError from 'hooks/useCatchTxError'
import AddToWalletButton, { AddToWalletTextOptions } from 'components/AddToWallet/AddToWalletButton'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { readContracts, useAccount } from 'wagmi'
import nikaStakingAbi from 'config/abi/nikaStakingAbi.json'
import { format } from 'date-fns'
import { formatNumber, formatLpBalance } from '@pancakeswap/utils/formatBalance'
import StakedActionComponent from '@pancakeswap/uikit/src/widgets/Farm/components/FarmTable/Actions/StakedActionComponent'
import { NIKA_ADDR } from 'config/constants/nikaContract'
import Harvest from './Harvest'
import Stake from './Stake'
import { StakeInPoolModal } from '../StakeInPool'
import { WithdrawModal } from './WithdrawModal'

const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 1000px;
  }
`

const collapseAnimation = keyframes`
  from {
    max-height: 1000px;
  }
  to {
    max-height: 0px;
  }
`

const StyledActionPanel = styled.div<{ expanded: boolean }>`
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} 300ms linear forwards
        `
      : css`
          ${collapseAnimation} 300ms linear forwards
        `};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.dropdown};
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  padding: 12px;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    padding: 16px 32px;
  }
`

const ActionContainer = styled.div<{ isAutoVault?: boolean; hasBalance?: boolean }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-wrap: wrap;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: ${({ isAutoVault }) => (isAutoVault ? 'row' : null)};
    align-items: ${({ isAutoVault, hasBalance }) => (isAutoVault ? (hasBalance ? 'flex-start' : 'stretch') : 'center')};
  }
`

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
`

type MediaBreakpoints = {
  isXs: boolean
  isSm: boolean
  isMd: boolean
  isLg: boolean
  isXl: boolean
  isXxl: boolean
}

interface ActionPanelProps {
  expanded: boolean
  breakpoints: MediaBreakpoints
}

const InfoSection = styled(Box)`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;

  padding: 8px 8px;
  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 0;
    flex-basis: 230px;
    ${Text} {
      font-size: 14px;
    }
  }
`
const StatWrapper: FC<React.PropsWithChildren<{ label: ReactNode }>> = ({ children, label }) => {
  return (
    <Flex mb="2px" justifyContent="space-between" alignItems="center" width="100%">
      {label}
      <Flex alignItems="center">{children}</Flex>
    </Flex>
  )
}

const formatTime = (time: string | undefined) => {
  const type = 'HH:mm MM/dd/yyyy'
  if (!time) return ''
  return format(new Date(Number(time)), type)
}

const formatPercent = (number: any) => {
  // if (number.isNaN) return '0.00'
  return formatNumber(new BigNumber(number.toString()).dividedBy(100).toNumber(), 2, 4)
}

interface StakeData {
  monthlyAPR: string
  maxInterest: number
  claimedInterest: number
  f1Referee: number
  referrer: string
  claimEndsIn: string
  vestingEndsIn: string
  pendingRewards: number
  totalStaked: number
}
const TotalToken = ({ value, unit }: { value: number; unit?: string }) => {
  if (value >= 0) {
    return <Balance small value={value} decimals={0} unit={unit} />
  }
  return <Skeleton width="90px" height="21px" />
}

const LoadingData = ({ value, unit }: { value: string; unit?: string }) => {
  if (value) {
    return (
      <Text ml="4px" small>
        {`${value} ${unit || ''}`}
      </Text>
    )
  }

  return <Skeleton width="90px" height="21px" />
}

const ActionPanel: React.FC<React.PropsWithChildren<ActionPanelProps>> = ({ expanded }) => {
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const { chainId } = useActiveChainId()
  const nikaStakingContract = useNikaStakingContract()
  const nikaTokenContract = useTokenContract(NIKA_ADDR)
  const { toastSuccess } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const [isApproved, setIsApproved] = useState(false)
  const blockExplorers = chainId === 97 ? 'https://testnet.bscscan.com/' : 'https://bscscan.com/'
  const [stakeData, setStakeData] = useState<StakeData>()

  const getContractsData = async () => {
    if (!account) {
      const data: StakeData = {
        monthlyAPR: '0',
        maxInterest: 0,
        claimedInterest: 0,
        f1Referee: 0,
        referrer: 'No data',
        claimEndsIn: 'No data',
        vestingEndsIn: 'No data',
        pendingRewards: 0,
        totalStaked: 0,
      }

      setStakeData(data)
      return
    }
    const stakingContract = {
      address: nikaStakingContract.address,
      abi: nikaStakingAbi,
      chainId: 97,
    }
    const [poolPendingRewardPerday, userInformation, f1Referee, referrer] = await readContracts({
      contracts: [
        {
          ...stakingContract,
          functionName: 'poolPendingRewardPerday',
          args: [account],
        },
        {
          ...stakingContract,
          functionName: 'getUserInformation',
          args: [account],
        },
        {
          ...stakingContract,
          functionName: 'getF1Invited',
          args: [account],
        },
        {
          ...stakingContract,
          functionName: 'getUserReferrer',
          args: [account],
        },
      ],
    })

    const pendingRewards = poolPendingRewardPerday[0]

    // const [
    //   totalStakes,0
    //   totalWithdrawClaimed,1
    //   totalClaimed,2
    //   claimStakedPerDay,3
    //   maxClaim,4
    //   vestingDuration,5
    //   interestDuration,6
    //   lastClaimStaked,7
    //   lastUpdatedTime,8
    //   lastTimeDeposited,9
    //   lastTimeClaimed,10
    //   interestRates,11
    //   joinByReferral,12
    // ] = userInformation

    const totalStakes = userInformation[0]
    const totalClaimed = userInformation[2]
    const maxClaim = userInformation[4]
    const vestingDuration = userInformation[5]
    const interestDuration = userInformation[6]
    const lastTimeDeposited = userInformation[9]
    const interestRates = userInformation[11]

    const _totalStakes = formatLpBalance(new BigNumber(totalStakes.toString()), 18)
    const _maxClaim = formatLpBalance(new BigNumber(maxClaim.toString()), 18)
    const _totalClaimed = formatLpBalance(new BigNumber(totalClaimed.toString()), 18)
    const _pendingRewards = formatLpBalance(new BigNumber(pendingRewards.toString()), 18)

    const _referrer = referrer as string
    const accountEllipsis = referrer
      ? `${_referrer.substring(0, 2)}...${_referrer.substring(_referrer.length - 4)}`
      : ''
    const claimEndsIn = new BigNumber(lastTimeDeposited.toString()).plus(interestDuration.toString())
    const vestingEndsIn = claimEndsIn.plus(vestingDuration.toString())
    const data: StakeData = {
      monthlyAPR: formatPercent(interestRates),
      maxInterest: Number(_maxClaim),
      claimedInterest: Number(_totalClaimed),
      f1Referee: Number(f1Referee),
      referrer: accountEllipsis,
      claimEndsIn: formatTime(claimEndsIn.times(1000).toString()),
      vestingEndsIn: formatTime(vestingEndsIn.times(1000).toString()),
      pendingRewards: Number(_pendingRewards),
      totalStaked: Number(_totalStakes),
    }

    setStakeData(data)
    setStakeData(data)
    setStakeData(data)
  }

  const [onPresentStakeInPoolModal] = useModal(
    <StakeInPoolModal
      stakingTokenDecimals={18}
      stakingTokenSymbol="NIKA"
      stakingTokenAddress="0x483Ed007BA31da2D570bA816F028135d1F0c60A6" // to show token image
      updateStakingData={getContractsData}
    />,
  )

  const onWithdraw = async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return nikaStakingContract.withdraw()
    })
    if (receipt?.status) {
      setIsApproved(true)
      toastSuccess(t('Successfully withdraw'))
      getContractsData()
    }
  }

  const [onPresentWithdrawModal] = useModal(
    <WithdrawModal
      handleWithdrawConfirm={onWithdraw}
      pendingTx={pendingTx}
      formattedBalance=""
      fullBalance=""
      stakingTokenSymbol="NIKA"
      earningsDollarValue={0}
    />,
    false,
  )

  const handleApprove = useCallback(async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return callWithGasPrice(nikaTokenContract, 'approve', [nikaStakingContract.address, MaxUint256])
    })
    if (receipt?.status) {
      setIsApproved(true)
      toastSuccess(
        t('Contract Enabled'),
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('You can now stake in the %symbol% pool!', { symbol: 'NIKA' })}
        </ToastDescriptionWithTx>,
      )
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const amount = await nikaTokenContract.allowance(account, nikaStakingContract.address)
      const _isApproved = new BigNumber(amount.toString()).gt(0)
      setIsApproved(_isApproved)
    }
    fetchData()
  }, [])

  const handleStake = () => {
    onPresentStakeInPoolModal()
  }

  const handleWithdraw = () => {
    onPresentWithdrawModal()
  }

  useEffect(() => {
    getContractsData()
    const timer = setInterval(getContractsData, 10000)
    return () => {
      clearInterval(timer)
    }
  }, [account])

  return (
    <StyledActionPanel expanded={expanded}>
      <InfoSection>
        <Flex flexDirection="column" mb="8px">
          <StatWrapper label={<Text small>{t('Monthly APR')}:</Text>}>
            <LoadingData value={stakeData?.monthlyAPR} unit="%" />
          </StatWrapper>
          <StatWrapper label={<Text small>{t('Max Interest')}:</Text>}>
            <Text ml="4px" small>
              <TotalToken value={stakeData?.maxInterest} unit=" NIKA" />
            </Text>
          </StatWrapper>
          <StatWrapper label={<Text small>{t('Claimed Interest')}:</Text>}>
            <Text ml="4px" small>
              <TotalToken value={stakeData?.claimedInterest} unit=" NIKA" />
            </Text>
          </StatWrapper>
          <StatWrapper label={<Text small>{t('F1-Referee')}:</Text>}>
            <Text ml="4px" small>
              <TotalToken value={stakeData?.f1Referee} />
            </Text>
          </StatWrapper>
          <StatWrapper label={<Text small>{t('Referrer')}:</Text>}>
            {stakeData?.referrer !== 'No data' ? (
              <LinkExternal href={`https://testnet.bscscan.com/address/${account}`}>
                <LoadingData value={stakeData?.referrer} />
              </LinkExternal>
            ) : (
              <LoadingData value={stakeData?.referrer} />
            )}
          </StatWrapper>
          <StatWrapper label={<Text small>{t('Claim Ends In')}:</Text>}>
            <LoadingData value={stakeData?.claimEndsIn} />
          </StatWrapper>
          <StatWrapper label={<Text small>{t('Vesting Ends In')}:</Text>}>
            <LoadingData value={stakeData?.vestingEndsIn} />
          </StatWrapper>
          <StyledLinkExternal isBscScan href={`${blockExplorers}address/${nikaTokenContract.address}`}>
            {t('See Token Contract')}
          </StyledLinkExternal>
          <Flex mb="2px" justifyContent="flex-start">
            <LinkExternal href="" bold={false} small>
              {t('View Tutorial')}
            </LinkExternal>
          </Flex>
          <StyledLinkExternal isBscScan href={`${blockExplorers}address/${nikaStakingContract.address}`}>
            {t('View Contract ')}
          </StyledLinkExternal>
          <Flex justifyContent="flex-start">
            <AddToWalletButton
              variant="text"
              p="0"
              height="auto"
              style={{ fontSize: '14px', fontWeight: '400', lineHeight: 'normal' }}
              marginTextBetweenLogo="4px"
              textOptions={AddToWalletTextOptions.TEXT}
              tokenAddress={NIKA_ADDR}
              tokenSymbol="NIKA"
              tokenDecimals={18}
              tokenLogo="https://tokens.pancakeswap.finance/images/0x483Ed007BA31da2D570bA816F028135d1F0c60A6.png"
            />
          </Flex>
        </Flex>
      </InfoSection>
      <ActionContainer>
        <Box width="100%">
          <ActionContainer>
            <Harvest
              // earningToken={new Token(56, NIKA_TOKEN_ADDRESS, 18, 'NIKA')}
              pendingReward={stakeData?.pendingRewards}
            />
            {stakeData ? (
              stakeData.totalStaked > 0 ? (
                <StakedActionComponent
                  lpSymbol="NIKA"
                  onPresentWithdraw={handleWithdraw}
                  onPresentDeposit={handleStake}
                >
                  <Flex flex="1" flexDirection="column" alignSelf="flex-center">
                    <Balance lineHeight="1" bold fontSize="20px" decimals={5} value={stakeData.totalStaked} />

                    <Balance
                      display="inline"
                      fontSize="12px"
                      color="textSubtle"
                      decimals={2}
                      prefix="~"
                      value={stakeData.totalStaked}
                      unit=" USDC"
                    />
                  </Flex>
                </StakedActionComponent>
              ) : (
                <Stake
                  isApproved={isApproved}
                  pendingTx={pendingTx}
                  stakingToken={new Token(56, NIKA_ADDR, 18, 'NIKA')}
                  onStake={handleStake}
                  onApprove={handleApprove}
                />
              )
            ) : (
              <></>
            )}
          </ActionContainer>
        </Box>
      </ActionContainer>
    </StyledActionPanel>
  )
}

export default ActionPanel
