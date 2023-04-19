import React from 'react'
import { Skeleton, Text, Flex, Box, useMatchBreakpoints, Balance, Pool } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import { farmFromLpSymbolSelector } from 'state/farms/selectors'

const StyledCell = styled(Pool.BaseCell)`
  flex: 4.5;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex: 1 0 120px;
  }
`

const AutoEarningsCell = () => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const isLoading = false

  const hasEarnings = false
  const earningTokenBalance = 0
  const earningTokenPrice = 0
  const earningTokenDollarBalance = 0

  return (
    <StyledCell role="cell">
      <Text fontSize="12px" color="textSubtle" textAlign="left">
        NIKA Eared
      </Text>
      {isLoading ? (
        <Skeleton width="80px" height="16px" />
      ) : (
        <>
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
                <>
                  {earningTokenPrice > 0 && (
                    <Balance
                      display="inline"
                      fontSize="12px"
                      color="textSubtle"
                      decimals={2}
                      prefix="~"
                      value={earningTokenDollarBalance}
                      unit=" USD"
                    />
                  )}
                </>
              ) : (
                <Text mt="4px" fontSize="12px" color="textDisabled">
                  0 USD
                </Text>
              )}
            </Box>
          </Flex>
        </>
      )}
      <Pool.CellContent />
    </StyledCell>
  )
}

export default AutoEarningsCell
