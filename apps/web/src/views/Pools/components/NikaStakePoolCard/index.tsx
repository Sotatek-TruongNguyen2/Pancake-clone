import {
  Box,
  CardBody,
  CardProps,
  Flex,
  Text,
  TokenPairImage,
  FlexGap,
  Skeleton,
  Pool,
  useModal,
  useToast,
} from '@pancakeswap/uikit'
import { useAccount } from 'wagmi'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTranslation } from '@pancakeswap/localization'
import { useCallback, useEffect, useState } from 'react'
import useCatchTxError from 'hooks/useCatchTxError'
import { useNikaStakingContract, useTokenContract } from 'hooks/useContract'
import { NIKA_ADDR } from 'config/constants/nikaContract'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { MaxUint256, Token } from '@pancakeswap/sdk'
import { ToastDescriptionWithTx } from 'components/Toast'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { WithdrawModal } from '../NikaStakedPoolRow/WithdrawModal'
import Stake from '../NikaStakedPoolRow/Stake'
import { StakeInPoolModal } from '../StakeInPool'
import CardFooter from './CardFooter'

export const ActionContainer = styled(Flex)`
  flex-direction: column;
  padding: 16px;
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

  return (
    <Pool.StyledCard isActive>
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
      <ActionContainer>
        <Stake
          isApproved={isApproved}
          pendingTx={pendingTx}
          stakingToken={new Token(56, NIKA_ADDR, 18, 'NIKA')}
          onStake={handleStake}
          onApprove={handleApprove}
        />
      </ActionContainer>
      <CardFooter />
    </Pool.StyledCard>
  )
}

export default NikaStakePoolCard
