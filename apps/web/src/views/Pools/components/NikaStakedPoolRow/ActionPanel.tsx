import styled, { keyframes, css } from 'styled-components'
import { Box, Flex, Text, LinkExternal, useToast, useModal, Skeleton, Balance } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import { Token } from '@pancakeswap/sdk'
import { FC, ReactNode, useCallback, useEffect, useState } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { useNikaStakingContract, useOracleContract, useTokenContract } from 'hooks/useContract'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { MaxUint256 } from '@ethersproject/constants'
import { ToastDescriptionWithTx } from 'components/Toast'
import useCatchTxError from 'hooks/useCatchTxError'
import AddToWalletButton, { AddToWalletTextOptions } from 'components/AddToWallet/AddToWalletButton'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useAccount } from 'wagmi'
import { format } from 'date-fns'
import { formatNumber, formatLpBalance } from '@pancakeswap/utils/formatBalance'
import StakedActionComponent from '@pancakeswap/uikit/src/widgets/Farm/components/FarmTable/Actions/StakedActionComponent'
import { NIKA_ADDR } from 'config/constants/nikaContract'
import { NikaPoolState } from 'state/types'
import { useNikaPool } from 'state/nikaPool/hooks'
import Harvest from './Harvest'
import { StakeInPoolModal } from '../StakeInPool'
import { WithdrawModal } from './WithdrawModal'
import { ActionContainer } from '../PoolsTable/ActionPanel/styles'
import Stake from './Stake'

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

const ActionsContainer = styled.div<{ isAutoVault?: boolean; hasBalance?: boolean }>`
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
  if (!time || Number.isNaN(time) || time === 'NaN') return ''
  return format(new Date(Number(time)), type)
}

const formatPercent = (number: any) => {
  // if (number.isNaN) return '0.00'
  return formatNumber(new BigNumber(number.toString()).dividedBy(100).toNumber(), 2, 4)
}

const TotalToken = ({ value, unit }: { value: number; unit?: string }) => {
  if (value >= 0) {
    return <Balance small value={value} decimals={2} unit={unit} />
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
  const [withdrawableAmount, setWithdrawableAmount] = useState('')
  const oracleContract = useOracleContract()
  const [usdcAmount, setUsdcAmount] = useState(0)

  const {
    poolPendingRewardPerDay,
    f1Referee,
    referrer,
    userData: {
      totalStakes,
      totalClaimed,
      maxClaim,
      vestingDuration,
      interestDuration,
      lastTimeDeposited,
      interestRates,
      directBonus,
      matchingBonus,
    },
  } = useNikaPool() as NikaPoolState
  const lastTimeDepositedBigNumber = new BigNumber(lastTimeDeposited)
  const claimEndsInAsBigNumber = lastTimeDepositedBigNumber.plus(interestDuration)
  const vestingEndsInAsBigNumber = claimEndsInAsBigNumber.plus(vestingDuration)

  const monthlyAPR = formatPercent(interestRates || 0)
  const maxInterest = formatLpBalance(new BigNumber(maxClaim), 18)
  const formattedDirectBonus = formatLpBalance(new BigNumber(directBonus), 18)
  const formattedMatchingBonus = formatLpBalance(new BigNumber(matchingBonus), 18)
  const claimedInterest = formatLpBalance(new BigNumber(totalClaimed), 18)
  const formattedReferrer = referrer ? `${referrer.substring(0, 2)}...${referrer.substring(referrer.length - 4)}` : ''
  const startClaim = lastTimeDepositedBigNumber.lte(0)
    ? 'No Data'
    : formatTime(lastTimeDepositedBigNumber.times(1000).toString())
  const claimEndsIn = claimEndsInAsBigNumber.lte(0)
    ? 'No Data'
    : formatTime(claimEndsInAsBigNumber.times(1000).toString())
  const vestingEndsIn = vestingEndsInAsBigNumber.lte(0)
    ? 'No Data'
    : formatTime(vestingEndsInAsBigNumber.times(1000).toString())
  const pendingRewards = formatLpBalance(new BigNumber(poolPendingRewardPerDay), 18)
  const totalStaked = formatLpBalance(new BigNumber(totalStakes), 18)

  const [onPresentStakeInPoolModal] = useModal(
    <StakeInPoolModal
      stakingTokenDecimals={18}
      stakingTokenSymbol="NIKA"
      stakingTokenAddress="0x483Ed007BA31da2D570bA816F028135d1F0c60A6" // to show token image
    />,
  )

  const onWithdraw = async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return nikaStakingContract.withdraw()
    })
    if (receipt?.status) {
      setIsApproved(true)
      toastSuccess(t('Successfully withdraw'))
    }
  }

  const [onPresentWithdrawModal] = useModal(
    <WithdrawModal
      handleWithdrawConfirm={onWithdraw}
      pendingTx={pendingTx}
      formattedBalance={withdrawableAmount}
      stakingTokenSymbol="NIKA"
      earningsDollarValue={usdcAmount}
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
    const fetchData = async (_account: string) => {
      const amount = await nikaTokenContract.allowance(_account, nikaStakingContract.address)
      const _isApproved = new BigNumber(amount.toString()).gt(0)

      const withdrawAbleAmount = await nikaStakingContract.withdrawAble(_account)

      const withdrawAbleAmountBigNumber = new BigNumber(withdrawAbleAmount)
      console.log('withdrawAbleAmount: ', withdrawAbleAmount.toString())
      if (withdrawAbleAmountBigNumber.gt(0)) {
        const formattedWithdrawableAmount = formatLpBalance(withdrawAbleAmountBigNumber, 18)
        const _usdcAmount = await oracleContract.consult(NIKA_ADDR, withdrawAbleAmountBigNumber.toString())
        const formattedUsdcAmount = formatLpBalance(_usdcAmount.toString(), 18)
        setUsdcAmount(Number(formattedUsdcAmount))
        setWithdrawableAmount(formattedWithdrawableAmount)
      } else {
        setUsdcAmount(0)
        setWithdrawableAmount('0')
      }

      setIsApproved(_isApproved)
    }
    if (!account) return
    fetchData(account)
  }, [])

  const handleStake = () => {
    onPresentStakeInPoolModal()
  }

  const handleWithdraw = () => {
    onPresentWithdrawModal()
  }

  return (
    <StyledActionPanel expanded={expanded}>
      <InfoSection>
        <Flex flexDirection="column" mb="8px">
          <StatWrapper label={<Text small>{t('Monthly APR')}:</Text>}>
            <LoadingData value={monthlyAPR} unit="%" />
          </StatWrapper>
          <StatWrapper label={<Text small>{t('Max Interest')}:</Text>}>
            <Text ml="4px" small>
              <TotalToken value={Number(maxInterest)} unit=" NIKA" />
            </Text>
          </StatWrapper>
          <StatWrapper label={<Text small>{t('Claimed Interest')}:</Text>}>
            <Text ml="4px" small>
              <TotalToken value={Number(claimedInterest)} unit=" NIKA" />
            </Text>
          </StatWrapper>
          <StatWrapper label={<Text small>{t('Direct Bonus')}:</Text>}>
            <Text ml="4px" small>
              <TotalToken value={Number(formattedDirectBonus)} unit=" NIKA" />
            </Text>
          </StatWrapper>
          <StatWrapper label={<Text small>{t('Matching Bonus')}:</Text>}>
            <Text ml="4px" small>
              <TotalToken value={Number(formattedMatchingBonus)} unit=" NIKA" />
            </Text>
          </StatWrapper>
          <StatWrapper label={<Text small>{t('F1-Referee')}:</Text>}>
            <Text ml="4px" small>
              {f1Referee}
            </Text>
          </StatWrapper>
          <StatWrapper label={<Text small>{t('Referrer')}:</Text>}>
            {formattedReferrer !== 'No data' ? (
              <LinkExternal href={`https://testnet.bscscan.com/address/${account}`}>
                <LoadingData value={formattedReferrer} />
              </LinkExternal>
            ) : (
              <LoadingData value={formattedReferrer} />
            )}
          </StatWrapper>
          <StatWrapper label={<Text small>{t('Start Claim')}:</Text>}>
            <LoadingData value={startClaim} />
          </StatWrapper>
          <StatWrapper label={<Text small>{t('End Claim')}:</Text>}>
            <LoadingData value={claimEndsIn} />
          </StatWrapper>
          <StatWrapper label={<Text small>{t('Start Vesting')}:</Text>}>
            <LoadingData value={claimEndsIn} />
          </StatWrapper>
          <StatWrapper label={<Text small>{t('End Vesting')}:</Text>}>
            <LoadingData value={vestingEndsIn} />
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
      <ActionsContainer>
        <Box width="100%">
          <ActionsContainer>
            <Harvest pendingReward={Number(pendingRewards)} />
            {Number(totalStaked) > 0 ? (
              <StakedActionComponent lpSymbol="NIKA" onPresentWithdraw={handleWithdraw} onPresentDeposit={handleStake}>
                <Flex flex="1" flexDirection="column" alignSelf="flex-center">
                  <Balance lineHeight="1" bold fontSize="20px" decimals={5} value={Number(totalStaked)} />

                  <Balance
                    display="inline"
                    fontSize="12px"
                    color="textSubtle"
                    decimals={2}
                    prefix="~"
                    value={Number(totalStaked)}
                    unit=" USDC"
                  />
                </Flex>
              </StakedActionComponent>
            ) : (
              <ActionContainer>
                <Stake
                  isApproved={isApproved}
                  pendingTx={pendingTx}
                  stakingToken={new Token(56, NIKA_ADDR, 18, 'NIKA')}
                  onStake={handleStake}
                  onApprove={handleApprove}
                />
              </ActionContainer>
            )}
          </ActionsContainer>
        </Box>
      </ActionsContainer>
    </StyledActionPanel>
  )
}

export default ActionPanel
