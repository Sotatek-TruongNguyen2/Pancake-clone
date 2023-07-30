import { ReactNode } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { Button, Text } from '@pancakeswap/uikit'
import {
  ActionContent,
  ActionTitles,
  IconButtonWrapper,
} from '@pancakeswap/uikit/src/widgets/Farm/components/FarmTable/Actions/styles'

interface StakedActionComponentProps {
  lpSymbol: string
  children?: ReactNode
  disabledMinusButton?: boolean
  onPresentWithdraw: () => void
}

const StakedActionComponent: React.FunctionComponent<React.PropsWithChildren<StakedActionComponentProps>> = ({
  lpSymbol,
  children,
  disabledMinusButton,
  onPresentWithdraw,
}) => {
  const { t } = useTranslation()

  return (
    <>
      <ActionTitles>
        <Text bold color="secondary" fontSize="12px" pr="4px">
          {lpSymbol}
        </Text>
        <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px">
          {t('Shares')}
        </Text>
      </ActionTitles>
      <ActionContent>
        {children}
        <IconButtonWrapper>
          <Button mr="6px" variant="primary" disabled={disabledMinusButton} onClick={onPresentWithdraw}>
            Withdraw
          </Button>
        </IconButtonWrapper>
      </ActionContent>
    </>
  )
}

export default StakedActionComponent
