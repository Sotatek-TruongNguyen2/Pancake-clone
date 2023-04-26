import {
  Balance,
  Box,
  Flex,
  Pool,
  Skeleton,
  Text,
  TooltipText,
  useMatchBreakpoints,
  useTooltip,
} from '@pancakeswap/uikit'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import { formatLpBalance } from '@pancakeswap/utils/formatBalance'
import BigNumber from 'bignumber.js'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useOracleContract } from 'hooks/useContract'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { readContracts, useNetwork } from 'wagmi'
import oracleAbi from 'config/abi/oracleAbi.json'

const StyledCell = styled(Pool.BaseCell)`
  flex: 4.5;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex: 1 0 120px;
  }
`

const TokenPrice = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { isMobile } = useMatchBreakpoints()
  const [price, setPrice] = useState<BigNumber>(BIG_ZERO)
  const oracleContract = useOracleContract()
  const tooltipContent = price.toString()
  const { targetRef, tooltip, tooltipVisible } = useTooltip(tooltipContent, {
    placement: 'bottom-start',
  })

  useEffect(() => {
    const fetchTokenPrice = async () => {
      const [tokenPrice] = await readContracts({
        contracts: [
          {
            address: oracleContract.address,
            abi: oracleAbi,
            functionName: 'price0Average',
            chainId: 97,
          },
        ],
      })
      setIsLoading(false)
      if (!tokenPrice) return
      const bigPrice = new BigNumber(tokenPrice.toString())
      const priceAmount = bigPrice.dividedBy(new BigNumber(2).pow(112))
      setPrice(priceAmount)
    }
    fetchTokenPrice()
    const timer = setInterval(fetchTokenPrice, 10000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  const formatPriceAmount = (amount: BigNumber) => {
    if (amount.gt(0) && amount.lt(0.00001)) {
      return '< 0.00001'
    }
    return amount.toFixed(5, BigNumber.ROUND_DOWN)
  }

  return (
    <StyledCell role="cell">
      <Text fontSize="12px" color="textSubtle" textAlign="left">
        TokenPrice
      </Text>
      {isLoading ? (
        <Skeleton width="80px" height="16px" />
      ) : (
        <>
          <Flex>
            <Box mr="8px" height="32px">
              {tooltipVisible && tooltip}
              <TooltipText ref={targetRef}>
                <Text color="primary" fontSize={isMobile ? '14px' : '16px'} bold={!isMobile}>
                  {formatPriceAmount(price)}
                </Text>
              </TooltipText>
            </Box>
          </Flex>
        </>
      )}
    </StyledCell>
  )
}

export default TokenPrice
