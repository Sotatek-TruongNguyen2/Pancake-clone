import { getAddress } from '@ethersproject/address'
import memoize from 'lodash/memoize'
import { ChainId, Token } from '@pancakeswap/sdk'

const mapping = {
  [ChainId.BSC]: 'smartchain',
}

const getTokenLogoURL = memoize(
  (token?: Token) => {
    if (token && mapping[token.chainId]) {
      if (
        token.address === '0x27a738731c859ffc61a3B0D62cd54781B3CFC613' ||
        token.address === '0x483Ed007BA31da2D570bA816F028135d1F0c60A6'
      )
        return '/images/nika-token.png'
      return `https://assets-cdn.trustwallet.com/blockchains/${mapping[token.chainId]}/assets/${getAddress(
        token.address,
      )}/logo.png`
    }
    return null
  },
  (t) => `${t.chainId}#${t.address}`,
)

export const getTokenLogoURLByAddress = memoize(
  (address?: string, chainId?: number) => {
    if (address && chainId && mapping[chainId]) {
      if (
        address === '0x27a738731c859ffc61a3B0D62cd54781B3CFC613' ||
        address === '0x483Ed007BA31da2D570bA816F028135d1F0c60A6'
      )
        return '/images/nika-token.png'
      return `https://assets-cdn.trustwallet.com/blockchains/${mapping[chainId]}/assets/${getAddress(address)}/logo.png`
    }
    return null
  },
  (address, chainId) => `${chainId}#${address}`,
)

export default getTokenLogoURL
