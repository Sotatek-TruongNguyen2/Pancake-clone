import {
  Flex,
  TokenPairImage,
  Skeleton,
  Pool,
  useModal,
  Button,
  Text,
  Box,
  Image,
  Balance,
  useToast,
} from '@pancakeswap/uikit'
import { useAccount } from 'wagmi'
import { useTranslation } from '@pancakeswap/localization'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { LightGreyCard } from 'components/Card'
import { useNikaPool } from 'state/nikaPool/hooks'
import { formatLpBalance } from '@pancakeswap/utils/formatBalance'
import BigNumber from 'bignumber.js'
import { NikaPoolState } from 'state/types'
import useCatchTxError from 'hooks/useCatchTxError'
import { useNikaStakingContract, useOracleContract } from 'hooks/useContract'
import { NIKA_ADDR } from 'config/constants/nikaContract'
import { WithdrawModal } from '../BuyInPoolRow/WithdrawModal'
import StakedActionComponent from '../BuyInPoolRow/StakedActionComponent'
import Harvest from '../BuyInPoolRow/Harvest'
import CardFooter from './CardFooter'
import TokenPrice from './TokenPrice'
import { BuyInPoolModal } from '../BuyInPoolRow/BuyInPoolModal'

export const ActionContainer = styled(Flex)`
  flex-direction: column;
  padding: 24px;
  margin-bottom: 16px;
`

interface BuyInPoolCardProps {
  showSkeleton?: boolean
}

const BuyInPoolCard = ({ showSkeleton = false }: BuyInPoolCardProps) => {
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const nikaStakingContract = useNikaStakingContract()
  const { toastSuccess } = useToast()
  const [withdrawableAmount, setWithdrawableAmount] = useState('')
  const oracleContract = useOracleContract()
  const [usdcAmount, setUsdcAmount] = useState(0)
  const [status, setStatus] = useState('Open')
  const [onPresentBuyInPoolModal] = useModal(<BuyInPoolModal />)

  const {
    poolPendingRewardPerDay,
    totalStaked: totalStakedAmount,
    userData: { totalStakes },
  } = useNikaPool() as NikaPoolState
  const pendingRewards = formatLpBalance(new BigNumber(poolPendingRewardPerDay || 0), 18)
  const totalStaked = formatLpBalance(new BigNumber(totalStakes || 0), 18)
  const _totalStakedAmount = formatLpBalance(new BigNumber(totalStakedAmount || 0), 18)

  const onWithdraw = async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return nikaStakingContract.withdraw()
    })
    if (receipt?.status) {
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

  useEffect(() => {
    const fetchData = async (_account: string) => {
      if (!nikaStakingContract) return

      const withdrawAbleAmount = await nikaStakingContract.withdrawAble(_account)

      const withdrawAbleAmountBigNumber = new BigNumber(withdrawAbleAmount.toString())

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
  }, [account, nikaStakingContract, oracleContract])

  const handleWithdraw = () => {
    onPresentWithdrawModal()
  }

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
            <Pool.PoolCardHeaderTitle title={t('Buy/ Stake NIKA')} subTitle={t('Stake, Earn – And more!')} />
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
      <Box px="24px" pt="24px">
        <LightGreyCard>
          <Flex alignItems="center" justifyContent="space-between">
            <Text color="textSubtle" textTransform="uppercase" bold fontSize="12px">
              {t('Token Price')}
            </Text>
            <TokenPrice />
          </Flex>
          <Flex alignItems="center" justifyContent="space-between">
            <Text color="textSubtle" textTransform="uppercase" bold fontSize="12px">
              {t('Status')}
            </Text>
            <Text color={status === t('Active') || status === t('Open') ? 'primary' : 'text'}>{status}</Text>
          </Flex>
        </LightGreyCard>
      </Box>
      <ActionContainer>
        {account ? (
          <Button width="100%" onClick={onPresentBuyInPoolModal}>
            {t('Buy')}
          </Button>
        ) : (
          <ConnectWalletButton width={300} />
        )}

        <Box mt="25px">
          <Harvest pendingReward={Number(pendingRewards)} />
        </Box>
        <StakedActionComponent lpSymbol="NIKA" onPresentWithdraw={handleWithdraw}>
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
      </ActionContainer>
      <CardFooter />
    </Pool.StyledCard>
  )
}

export default BuyInPoolCard
