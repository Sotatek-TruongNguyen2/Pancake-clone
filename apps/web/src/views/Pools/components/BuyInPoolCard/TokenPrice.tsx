import { Box, Flex, Skeleton, Text, TooltipText, useMatchBreakpoints, useTooltip } from '@pancakeswap/uikit'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import BigNumber from 'bignumber.js'
import { useOracleContract } from 'hooks/useContract'
import { useEffect, useState } from 'react'
import { readContracts } from 'wagmi'
import oracleAbi from 'config/abi/oracleAbi.json'
import { useActiveChainId } from 'hooks/useActiveChainId'

const TokenPrice = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { isMobile } = useMatchBreakpoints()
  const [price, setPrice] = useState<BigNumber>(BIG_ZERO)
  const oracleContract = useOracleContract()
  const tooltipContent = price.toString().substring(0, 20)
  const { chainId } = useActiveChainId()
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
            chainId,
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
    <>
      {isLoading ? (
        <Skeleton width="80px" height="16px" />
      ) : (
        <>
          <Flex>
            <Box height="32px">
              {tooltipVisible && tooltip}
              <TooltipText ref={targetRef}>
                <Text color="primary" fontSize={isMobile ? '14px' : '16px'} bold={!isMobile} overflowX="hidden">
                  {formatPriceAmount(price)}
                </Text>
              </TooltipText>
            </Box>
          </Flex>
        </>
      )}
    </>
  )
}

export default TokenPrice
