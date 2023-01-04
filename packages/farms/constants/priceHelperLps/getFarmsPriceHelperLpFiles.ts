import { ChainId } from '@pancakeswap/sdk'
import FarmsBscPriceHelper from './56'
import FarmsBscTestnetPriceHelper from './97'

export const getFarmsPriceHelperLpFiles = (chainId: ChainId) => {
  switch (chainId) {
    case ChainId.BSC:
      return FarmsBscPriceHelper
    case ChainId.BSC_TESTNET:
      return FarmsBscTestnetPriceHelper
    default:
      return []
  }
}
