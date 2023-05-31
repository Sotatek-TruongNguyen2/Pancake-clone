import React from 'react'
import { Text, Flex, Box, useMatchBreakpoints, Balance, Pool } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'

const StyledCell = styled(Pool.BaseCell)`
  flex: 4.5;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex: 1 0 120px;
  }
`
interface AutoEarningsCellProps {
  earningTokenBalance: number
  earningTokenDollarBalance: number
}
const AutoEarningsCell = ({ earningTokenBalance, earningTokenDollarBalance }: AutoEarningsCellProps) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const hasEarnings = earningTokenBalance > 0
  return (
    <StyledCell role="cell">
      <Text fontSize="12px" color="textSubtle" textAlign="left">
        {t('%asset% Earned', { asset: 'NIKA' })}
      </Text>

      <Flex>
        <Box mr="8px" height="32px">
          <Balance
            mt="4px"
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
              decimals={5}
              prefix="~"
              value={earningTokenDollarBalance}
              unit=" USD"
            />
          ) : (
            <Text mt="4px" fontSize="12px" color="textDisabled">
              0 USD
            </Text>
          )}
        </Box>
      </Flex>

      <Pool.CellContent />
    </StyledCell>
  )
}

export default AutoEarningsCell
