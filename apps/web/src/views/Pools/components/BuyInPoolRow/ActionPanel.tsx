import styled, { keyframes, css } from 'styled-components'
import { Balance, Box, Flex, useMatchBreakpoints, useModal, useToast } from '@pancakeswap/uikit'
import { useCallback, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import Divider from 'components/Divider'
import { StyledActionContainer } from '@pancakeswap/uikit/src/widgets/Farm/components/FarmTable/Actions/styles'
import { useNikaPool } from 'state/nikaPool/hooks'
import { NikaPoolState } from 'state/types'
import { formatLpBalance } from '@pancakeswap/utils/formatBalance'
import BigNumber from 'bignumber.js'
import useCatchTxError from 'hooks/useCatchTxError'
import { useNikaStakingContract, useOracleContract, useTokenContract } from 'hooks/useContract'
import { NIKA_ADDR } from 'config/constants/nikaContract'
import { useTranslation } from '@pancakeswap/localization'
import { MaxUint256, Token } from '@pancakeswap/sdk'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import { StakeInPoolModal } from '../StakeInPool'
import { WithdrawModal } from './WithdrawModal'
import Stake from './Stake'
import Harvest from './Harvest'
import { ActionContainer } from '../PoolsTable/ActionPanel/styles'
import BuyingPoolInfoSection from '../BuyingPoolInfoSection'
import StakedActionComponent from './StakedActionComponent'
import InfoSection from './InfoSection'

const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 1500px;
  }
`

const collapseAnimation = keyframes`
  from {
    max-height: 1500px;
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

const InfoSectionWrapper = styled(Box)`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;

  padding: 8px 8px;
  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 0;
    flex-basis: 230px;
  }
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
const ActionPanel: React.FC<React.PropsWithChildren<ActionPanelProps>> = ({ expanded }) => {
  const { isMobile } = useMatchBreakpoints()
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const nikaStakingContract = useNikaStakingContract()
  const oracleContract = useOracleContract()
  const nikaTokenContract = useTokenContract(NIKA_ADDR)
  const { toastSuccess } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const {
    poolPendingRewardPerDay,
    userData: { totalStakes },
  } = useNikaPool() as NikaPoolState
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()

  const [withdrawableAmount, setWithdrawableAmount] = useState('')
  const [usdcAmount, setUsdcAmount] = useState(0)
  const [isApproved, setIsApproved] = useState(false)

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
      closeWithdrawModal()
    }
  }

  const [onPresentWithdrawModal, closeWithdrawModal] = useModal(
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
      if (!nikaTokenContract) return
      const amount = await nikaTokenContract.allowance(_account, nikaStakingContract.address)
      const _isApproved = new BigNumber(amount.toString()).gt(0)
      setIsApproved(_isApproved)

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
  }, [account, nikaTokenContract, nikaStakingContract])

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

  const handleWithdraw = () => {
    onPresentWithdrawModal()
  }
  const handleStake = () => {
    onPresentStakeInPoolModal()
  }

  const pendingRewards = formatLpBalance(new BigNumber(poolPendingRewardPerDay), 18)
  const formattedTotalStakes = formatLpBalance(new BigNumber(totalStakes), 18)

  return (
    <StyledActionPanel expanded={expanded}>
      <Box style={{ width: '100%' }}>
        <Flex
          flexDirection={isMobile ? 'column' : 'row'}
          justifyContent="space-between"
          width="100%"
          style={{ gap: '40px' }}
        >
          <BuyingPoolInfoSection />
        </Flex>
        <Divider />

        <Flex flexDirection={isMobile ? 'column-reverse' : 'row'} justifyContent="center">
          <InfoSectionWrapper>
            <InfoSection />
          </InfoSectionWrapper>
          <ActionsContainer>
            <Box width="100%">
              <ActionsContainer>
                <ActionContainer>
                  <Harvest pendingReward={Number(pendingRewards)} />
                </ActionContainer>
                <StyledActionContainer>
                  <StakedActionComponent lpSymbol="NIKA" onPresentWithdraw={handleWithdraw}>
                    <Flex flex="1" flexDirection="column" alignSelf="flex-center">
                      <Balance lineHeight="1" bold fontSize="20px" decimals={5} value={Number(formattedTotalStakes)} />

                      <Balance
                        display="inline"
                        fontSize="12px"
                        color="textSubtle"
                        decimals={2}
                        prefix="~"
                        value={Number(formattedTotalStakes)}
                        unit=" USDT"
                      />
                    </Flex>
                  </StakedActionComponent>
                </StyledActionContainer>
              </ActionsContainer>
            </Box>
          </ActionsContainer>
        </Flex>
      </Box>
    </StyledActionPanel>
  )
}

export default ActionPanel
