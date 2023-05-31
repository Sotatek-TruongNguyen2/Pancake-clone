import { Flex, TokenPairImage, Skeleton, Pool, useModal, useToast, Balance, Box, Text, Image } from '@pancakeswap/uikit'
import { useAccount } from 'wagmi'
import { useTranslation } from '@pancakeswap/localization'
import { useCallback, useEffect, useState } from 'react'
import useCatchTxError from 'hooks/useCatchTxError'
import { useNikaStakingContract, useOracleContract, useTokenContract } from 'hooks/useContract'
import { NIKA_ADDR } from 'config/constants/nikaContract'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { MaxUint256, Token } from '@pancakeswap/sdk'
import { ToastDescriptionWithTx } from 'components/Toast'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { formatLpBalance } from '@pancakeswap/utils/formatBalance'
import StakedActionComponent from '@pancakeswap/uikit/src/widgets/Farm/components/FarmTable/Actions/StakedActionComponent'
import { NikaPoolState } from 'state/types'
import { useNikaPool } from 'state/nikaPool/hooks'
import { LightGreyCard } from 'components/Card'
import { WithdrawModal } from '../NikaStakedPoolRow/WithdrawModal'
import Stake from '../NikaStakedPoolRow/Stake'
import { StakeInPoolModal } from '../StakeInPool'
import CardFooter from './CardFooter'
import Harvest from '../NikaStakedPoolRow/Harvest'
import AutoEarnings from './AutoEarnings'

export const ActionContainer = styled(Flex)`
  flex-direction: column;
  padding: 24px;
  margin-bottom: 16px;
`

interface NikaStakePoolCardProps {
  showSkeleton?: boolean
}
const NikaStakePoolCard = ({ showSkeleton = false }: NikaStakePoolCardProps) => {
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const [isApproved, setIsApproved] = useState(false)
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const nikaStakingContract = useNikaStakingContract()
  const nikaTokenContract = useTokenContract(NIKA_ADDR)
  const { callWithGasPrice } = useCallWithGasPrice()
  const { toastSuccess } = useToast()
  const [withdrawableAmount, setWithdrawableAmount] = useState('')
  const oracleContract = useOracleContract()
  const [usdcAmount, setUsdcAmount] = useState(0)
  const [usdcPendingRewardsAmount, setUsdcPendingRewardsAmount] = useState(0)

  const {
    poolPendingRewardPerDay,
    totalStaked: totalStakedAmount,
    userData: { totalStakes },
  } = useNikaPool() as NikaPoolState
  const pendingRewards = formatLpBalance(new BigNumber(poolPendingRewardPerDay), 18)
  const totalStaked = formatLpBalance(new BigNumber(totalStakes), 18)
  const _totalStakedAmount = formatLpBalance(new BigNumber(totalStakedAmount), 18)

  const onWithdraw = async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return nikaStakingContract.withdraw()
    })
    if (receipt?.status) {
      setIsApproved(true)
      toastSuccess(t('Successfully withdraw'))
    }
  }

  const [onPresentStakeInPoolModal] = useModal(
    <StakeInPoolModal
      stakingTokenDecimals={18}
      stakingTokenSymbol="NIKA"
      stakingTokenAddress="0x483Ed007BA31da2D570bA816F028135d1F0c60A6" // to show token image
    />,
  )

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
      setIsApproved(_isApproved)

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
    }
    if (!account) return
    fetchData(account)
  }, [account])

  useEffect(() => {
    const fetchData = async (_pendingRewards: string) => {
      if (!_pendingRewards) return
      const _usdcAmount = await oracleContract.consult(
        NIKA_ADDR,
        new BigNumber(_pendingRewards || 0).times(new BigNumber(10).pow(18)).toString(),
      )
      setUsdcPendingRewardsAmount(
        new BigNumber(_usdcAmount.toString() || 0).dividedBy(new BigNumber(10).pow(18)).toNumber(),
      )
    }
    fetchData(pendingRewards)
  }, [pendingRewards, oracleContract])

  const handleStake = () => {
    onPresentStakeInPoolModal()
  }

  const handleWithdraw = () => {
    onPresentWithdrawModal()
  }

  const status = t('Active')
  return (
    <Pool.StyledCard isActive style={{ overflow: 'visible' }}>
      <Image
        style={{ position: 'absolute', top: '-25px', left: '-25px' }}
        alt="star-icon"
        src="./images/star-icon.png"
        width={60}
        height={60}
      />
      <Pool.PoolCardHeader>
        {!showSkeleton ? (
          <>
            <Pool.PoolCardHeaderTitle title={t('Stake NIKA')} subTitle={t('Stake, Earn – And more!')} />
            <TokenPairImage
              primarySrc="/images/tokens/0x483Ed007BA31da2D570bA816F028135d1F0c60A6.png"
              secondarySrc="/images/tokens/autorenew.svg"
              width={64}
              height={64}
            />
          </>
        ) : (
          <Flex width="100%" justifyContent="space-between">
            <Flex flexDirection="column">
              <Skeleton width={100} height={26} mb="4px" />
              <Skeleton width={65} height={20} />
            </Flex>
            <Skeleton width={58} height={58} variant="circle" />
          </Flex>
        )}
      </Pool.PoolCardHeader>
      <Box px="24px" py="24px">
        <LightGreyCard>
          <Flex alignItems="center" justifyContent="space-between">
            <AutoEarnings
              earningTokenBalance={Number(pendingRewards)}
              earningTokenDollarBalance={usdcPendingRewardsAmount}
            />
          </Flex>
          <Flex alignItems="center" justifyContent="space-between">
            <Text color="textSubtle" textTransform="uppercase" bold fontSize="12px">
              {t('Status')}
            </Text>
            <Text color={status === t('Active') || status === t('Open') ? 'primary' : 'text'}>{status}</Text>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between">
            <Text color="textSubtle" textTransform="uppercase" bold fontSize="12px">
              {t('Total staked')}
            </Text>
            <Text>
              <Balance fontSize="16px" value={Number(_totalStakedAmount)} decimals={0} unit={` NIKA`} />
            </Text>
          </Flex>
        </LightGreyCard>
      </Box>
      <ActionContainer>
        <Box mb="25px">
          <Harvest pendingReward={Number(pendingRewards)} />
        </Box>
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
      </ActionContainer>
      <CardFooter />
    </Pool.StyledCard>
  )
}

export default NikaStakePoolCard
