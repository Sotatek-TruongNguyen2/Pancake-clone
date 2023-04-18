import { useTranslation } from '@pancakeswap/localization'
import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { formatNumber, getDecimalAmount, getFullDisplayBalance } from '@pancakeswap/utils/formatBalance'
import removeTrailingZeros from '@pancakeswap/utils/removeTrailingZeros'
import {
  AutoRenewIcon,
  BalanceInput,
  Button,
  Flex,
  Image,
  Link,
  Text,
  RoiCalculatorModal,
  Modal,
} from '@pancakeswap/uikit'
import getThemeValue from '@pancakeswap/uikit/src/util/getThemeValue'
import PercentageButton from '../Modals/PercentageButton'
import Slider from './Slider'

const StyledLink = styled((props) => <Link {...props} />)`
  width: 100%;
`

interface BuyInPoolModalProps {
  // Pool attributes
  stakingTokenDecimals: number
  stakingTokenSymbol: string
  stakingTokenAddress: string
  earningTokenPrice: number
  apr: number
  stakingLimit: BigNumber
  earningTokenSymbol: string
  userDataStakedBalance: BigNumber
  userDataStakingTokenBalance: BigNumber
  enableEmergencyWithdraw: boolean

  stakingTokenBalance: BigNumber
  stakingTokenPrice: number
  isRemovingStake?: boolean
  needEnable?: boolean
  enablePendingTx?: boolean
  setAmount?: (value: string) => void
  onDismiss?: () => void
  handleEnableApprove?: () => void
  account: string
  handleConfirmClick: any
  pendingTx: boolean
  imageUrl?: string
}

export const BuyInPoolModal: React.FC<React.PropsWithChildren<BuyInPoolModalProps>> = ({
  stakingTokenDecimals,
  stakingTokenSymbol,
  stakingTokenAddress,
  stakingTokenBalance,
  stakingTokenPrice,
  apr,
  stakingLimit,
  earningTokenPrice,
  earningTokenSymbol,
  userDataStakedBalance,
  userDataStakingTokenBalance,
  needEnable,
  enablePendingTx,
  setAmount,
  onDismiss,
  handleEnableApprove,
  account,
  pendingTx,
  handleConfirmClick,
  imageUrl = '/images/tokens/',
}) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const [stakeAmount, setStakeAmount] = useState('')
  const [hasReachedStakeLimit, setHasReachedStakedLimit] = useState(false)
  const [percent, setPercent] = useState(0)
  const [showRoiCalculator, setShowRoiCalculator] = useState(false)
  const getCalculatedStakingLimit = useCallback(() => {
    if (stakingLimit.gt(0)) {
      const stakingLimitLeft = stakingLimit.minus(userDataStakedBalance)
      if (stakingTokenBalance.gt(stakingLimitLeft)) {
        return stakingLimitLeft
      }
    }
    return stakingTokenBalance
  }, [userDataStakedBalance, stakingTokenBalance, stakingLimit])
  const fullDecimalStakeAmount = getDecimalAmount(new BigNumber(stakeAmount), stakingTokenDecimals)
  const userNotEnoughToken = userDataStakingTokenBalance.lt(fullDecimalStakeAmount)

  const usdValueStaked = new BigNumber(stakeAmount).times(stakingTokenPrice)
  const formattedUsdValueStaked = !usdValueStaked.isNaN() && formatNumber(usdValueStaked.toNumber())

  const getTokenLink = stakingTokenAddress ? `/swap?outputCurrency=${stakingTokenAddress}` : '/swap'

  useEffect(() => {
    if (stakingLimit.gt(0)) {
      setHasReachedStakedLimit(fullDecimalStakeAmount.plus(userDataStakedBalance).gt(stakingLimit))
    }
  }, [stakeAmount, stakingLimit, setHasReachedStakedLimit, fullDecimalStakeAmount, userDataStakedBalance])

  const handleStakeInputChange = (input: string) => {
    if (input) {
      const convertedInput = getDecimalAmount(new BigNumber(input), stakingTokenDecimals)
      const percentage = Math.floor(convertedInput.dividedBy(getCalculatedStakingLimit()).multipliedBy(100).toNumber())
      setPercent(Math.min(percentage, 100))
    } else {
      setPercent(0)
    }
    setStakeAmount(input)
  }

  const handleChangePercent = useCallback(
    (sliderPercent: number) => {
      if (sliderPercent > 0) {
        const percentageOfStakingMax = getCalculatedStakingLimit().dividedBy(100).multipliedBy(sliderPercent)
        const amountToStake = getFullDisplayBalance(percentageOfStakingMax, stakingTokenDecimals, stakingTokenDecimals)

        setStakeAmount(removeTrailingZeros(amountToStake))
      } else {
        setStakeAmount('')
      }
      setPercent(sliderPercent)
    },
    [getCalculatedStakingLimit, stakingTokenDecimals],
  )

  useEffect(() => {
    if (setAmount) {
      setAmount(Number(stakeAmount) > 0 ? stakeAmount : '0')
    }
  }, [setAmount, stakeAmount])

  if (showRoiCalculator) {
    return (
      <RoiCalculatorModal
        account={account}
        earningTokenPrice={earningTokenPrice}
        stakingTokenPrice={stakingTokenPrice}
        stakingTokenDecimals={stakingTokenDecimals}
        apr={apr}
        linkLabel={t('Get %symbol%', { symbol: stakingTokenSymbol })}
        linkHref={getTokenLink}
        stakingTokenBalance={userDataStakedBalance.plus(stakingTokenBalance)}
        stakingTokenSymbol={stakingTokenSymbol}
        earningTokenSymbol={earningTokenSymbol}
        onBack={() => setShowRoiCalculator(false)}
        initialValue={stakeAmount}
      />
    )
  }

  return (
    <Modal
      minWidth="346px"
      title={t('Buy in Pool')}
      onDismiss={onDismiss}
      headerBackground={getThemeValue(theme, 'colors.gradientCardHeader')}
    >
      {stakingLimit.gt(0) && (
        <Text color="secondary" bold mb="24px" style={{ textAlign: 'center' }} fontSize="16px">
          {t('Max buy for this pool: %amount% %token%', {
            amount: getFullDisplayBalance(stakingLimit, stakingTokenDecimals, 0),
            token: stakingTokenSymbol,
          })}
        </Text>
      )}
      <Flex alignItems="center" justifyContent="space-between" mb="8px">
        <Text bold>{t('Buy')}:</Text>
        <Flex alignItems="center" minWidth="70px">
          <Image src={`${imageUrl}${stakingTokenAddress}.png`} width={24} height={24} alt={stakingTokenSymbol} />
          <Text ml="4px" bold>
            {stakingTokenSymbol}
          </Text>
        </Flex>
      </Flex>
      <BalanceInput
        value={stakeAmount}
        onUserInput={handleStakeInputChange}
        currencyValue={stakingTokenPrice !== 0 && `~${formattedUsdValueStaked || 0} USD`}
        isWarning={hasReachedStakeLimit || userNotEnoughToken}
        decimals={stakingTokenDecimals}
      />

      {hasReachedStakeLimit && (
        <Text color="failure" fontSize="12px" style={{ textAlign: 'right' }} mt="4px">
          {t('Maximum total buy: %amount% %token%', {
            amount: getFullDisplayBalance(new BigNumber(stakingLimit), stakingTokenDecimals, 0),
            token: stakingTokenSymbol,
          })}
        </Text>
      )}
      {userNotEnoughToken && (
        <Text color="failure" fontSize="12px" style={{ textAlign: 'right' }} mt="4px">
          {t('Insufficient %symbol% balance', {
            symbol: stakingTokenSymbol,
          })}
        </Text>
      )}
      {needEnable && (
        <Text color="failure" textAlign="right" fontSize="12px" mt="8px">
          {t('Insufficient token allowance. Click "Enable" to approve.')}
        </Text>
      )}
      <Text ml="auto" color="textSubtle" fontSize="12px" mb="8px">
        {t('Balance: %balance%', {
          balance: getFullDisplayBalance(stakingTokenBalance, stakingTokenDecimals),
        })}
      </Text>

      <Flex alignItems="center" justifyContent="space-between" mb="8px" mt="16px">
        <Text bold>Referrer address:</Text>
      </Flex>
      <BalanceInput
        value={stakeAmount}
        onUserInput={handleStakeInputChange}
        currencyValue={stakingTokenPrice !== 0 && `~${formattedUsdValueStaked || 0} USD`}
        isWarning={hasReachedStakeLimit || userNotEnoughToken}
        decimals={stakingTokenDecimals}
      />

      <Slider
        min={0}
        max={100}
        value={percent}
        onValueChanged={handleChangePercent}
        name="buy"
        valueLabel={`${percent}%`}
        step={1}
      />

      <Flex alignItems="center" justifyContent="space-between" mt="8px">
        <PercentageButton onClick={() => handleChangePercent(25)}>25%</PercentageButton>
        <PercentageButton onClick={() => handleChangePercent(50)}>50%</PercentageButton>
        <PercentageButton onClick={() => handleChangePercent(75)}>75%</PercentageButton>
        <PercentageButton onClick={() => handleChangePercent(100)}>{t('Max')}</PercentageButton>
      </Flex>

      {needEnable ? (
        <Button
          isLoading={enablePendingTx}
          endIcon={enablePendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
          onClick={handleEnableApprove}
          mt="24px"
        >
          {t('Enable')}
        </Button>
      ) : (
        <Button
          isLoading={pendingTx}
          endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
          onClick={() => handleConfirmClick(stakeAmount)}
          disabled={!stakeAmount || parseFloat(stakeAmount) === 0 || hasReachedStakeLimit || userNotEnoughToken}
          mt="24px"
        >
          {pendingTx ? t('Confirming') : t('Confirm')}
        </Button>
      )}

      <StyledLink href="">
        <Button width="100%" mt="8px" variant="secondary">
          {t('Get %symbol%', { symbol: stakingTokenSymbol })}
        </Button>
      </StyledLink>
    </Modal>
  )
}
