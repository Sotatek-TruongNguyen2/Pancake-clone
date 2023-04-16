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
        token.address === '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82' ||
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
        address === '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82' ||
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
