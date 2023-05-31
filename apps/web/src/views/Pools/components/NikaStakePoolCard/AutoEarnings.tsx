import { Text, Flex, useMatchBreakpoints, Balance, Pool } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'

interface AutoEarningsProps {
  earningTokenBalance: number
  earningTokenDollarBalance: number
}
const AutoEarnings = ({ earningTokenBalance, earningTokenDollarBalance }: AutoEarningsProps) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const hasEarnings = earningTokenBalance > 0
  return (
    <>
      <Text color="textSubtle" textTransform="uppercase" bold fontSize="12px">
        {t('%asset% Earned', { asset: 'NIKA' })}
      </Text>

      <Flex justifyContent="flex-end" flexGrow="1">
        <Flex alignItems="center">
          <Balance
            bold={!isMobile}
            fontSize={isMobile ? '14px' : '16px'}
            color={hasEarnings ? 'primary' : 'textDisabled'}
            decimals={hasEarnings ? 5 : 1}
            value={hasEarnings ? earningTokenBalance : 0}
          />
          {hasEarnings ? (
            <Balance
              display="inline"
              fontSize="12px"
              color="textSubtle"
              decimals={2}
              prefix="~"
              value={earningTokenDollarBalance}
              unit=" USD"
            />
          ) : (
            <Text mt="4px" fontSize="12px" color="textDisabled">
              0 USD
            </Text>
          )}
        </Flex>
      </Flex>

      <Pool.CellContent />
    </>
  )
}

export default AutoEarnings
