import { useTranslation } from '@pancakeswap/localization'
import { AutoRenewIcon, Button, Flex, Heading, Modal, Text } from '@pancakeswap/uikit'
import getThemeValue from '@pancakeswap/uikit/src/util/getThemeValue'
import { formatNumber } from '@pancakeswap/utils/formatBalance'
import { useTheme } from 'styled-components'

export interface WithdrawModalProps {
  formattedBalance: string
  stakingTokenSymbol: string
  earningsDollarValue: number
  sousId: number
  isBnbPool: boolean
  onDismiss?: () => void
  poolAddress?: {
    [index: number]: string
  }
  earningTokenAddress?: string
}

export interface WithdrawModalWithHandlerProps extends Omit<WithdrawModalProps, 'isBnbPool' | 'sousId'> {
  handleWithdrawConfirm: () => Promise<any>
  pendingTx: boolean
}

export function WithdrawModal({
  formattedBalance,
  stakingTokenSymbol,
  earningsDollarValue,
  onDismiss,
  handleWithdrawConfirm,
  pendingTx,
}: WithdrawModalWithHandlerProps) {
  const { t } = useTranslation()
  const theme = useTheme()

  return (
    <Modal
      title={`${stakingTokenSymbol} ${t('Unstake')}`}
      onDismiss={onDismiss}
      headerBackground={getThemeValue(theme, 'colors.gradientCardHeader')}
    >
      <Flex justifyContent="space-between" alignItems="center" mb="8px">
        <Text>{t('Unstake')}:</Text>
      </Flex>
      <Flex flexDirection="column" mb="24px">
        <Heading>
          {formatNumber(Number(formattedBalance), 2, 5)} {stakingTokenSymbol}
        </Heading>
        {earningsDollarValue > 0 && (
          <Text fontSize="12px" color="textSubtle">{`~${formatNumber(earningsDollarValue, 2, 5)} USD`}</Text>
        )}
      </Flex>

      <Button
        mt="8px"
        onClick={handleWithdrawConfirm}
        isLoading={pendingTx}
        endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
        disabled={earningsDollarValue <= 0}
      >
        {pendingTx ? t('Confirming') : t('Confirm')}
      </Button>
      <Button variant="text" onClick={onDismiss} pb="0px">
        {t('Close Window')}
      </Button>
    </Modal>
  )
}
