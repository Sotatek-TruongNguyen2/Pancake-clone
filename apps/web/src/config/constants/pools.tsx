import { BigNumber } from '@ethersproject/bignumber'
import { Pool } from '@pancakeswap/uikit'
import { SerializedWrappedToken } from '@pancakeswap/token-lists'
import Trans from 'components/Trans'
import { VaultKey } from 'state/types'
import { bscTokens, CAKE_TESTNET } from '@pancakeswap/tokens'
import { PoolCategory } from './types'

export const MAX_LOCK_DURATION = 31536000
export const UNLOCK_FREE_DURATION = 604800
export const ONE_WEEK_DEFAULT = 604800
export const BOOST_WEIGHT = BigNumber.from('20000000000000')
export const DURATION_FACTOR = BigNumber.from('31536000')

export const vaultPoolConfig = {
  [VaultKey.CakeVaultV1]: {
    name: <Trans>Auto TIKTAK</Trans>,
    description: <Trans>Automatic restaking</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 380000,
    tokenImage: {
      primarySrc: `/images/tokens/${bscTokens.cake.address}.svg`,
      secondarySrc: '/images/tokens/autorenew.svg',
    },
  },
  [VaultKey.CakeVault]: {
    name: <Trans>Stake TIKTAK</Trans>,
    description: <Trans>Stake, Earn – And more!</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 600000,
    tokenImage: {
      primarySrc: `/images/tokens/${bscTokens.cake.address}.svg`,
      secondarySrc: '/images/tokens/autorenew.svg',
    },
  },
  [VaultKey.CakeFlexibleSideVault]: {
    name: <Trans>Flexible TIKTAK</Trans>,
    description: <Trans>Flexible staking on the side.</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 500000,
    tokenImage: {
      primarySrc: `/images/tokens/${bscTokens.cake.address}.svg`,
      secondarySrc: '/images/tokens/autorenew.svg',
    },
  },
  [VaultKey.IfoPool]: {
    name: 'IFO CAKE',
    description: <Trans>Stake TIKTAK to participate in IFOs</Trans>,
    autoCompoundFrequency: 1,
    gasLimit: 500000,
    tokenImage: {
      primarySrc: `/images/tokens/${bscTokens.cake.address}.svg`,
      secondarySrc: `/images/tokens/ifo-pool-icon.svg`,
    },
  },
} as const

export const livePools: Pool.SerializedPoolConfig<SerializedWrappedToken>[] = [
  {
    sousId: 0,
    stakingToken: CAKE_TESTNET,
    earningToken: CAKE_TESTNET,
    contractAddress: {
      97: '0x6c397dbb4AF0433BFcbc38b8f3380AdaF0aCb53A',
      56: '0xa5f8C5Dbd5F286960b9d90548680aE5ebFf07652',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '10',
    isFinished: false,
  },

  // {
  //   sousId: 0,
  //   stakingToken: bscTokens.cake,
  //   earningToken: bscTokens.cake,
  //   contractAddress: {
  //     97: '0xB4A466911556e39210a6bB2FaECBB59E4eB7E43d',
  //     56: '0xa5f8C5Dbd5F286960b9d90548680aE5ebFf07652',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   tokenPerBlock: '10',
  //   isFinished: false,
  // },
  //   {
  //     sousId: 308,
  //     stakingToken: bscTokens.cake,
  //     earningToken: bscTokens.primal,
  //     contractAddress: {
  //       56: '0x7cE7A5C3241629763899474500D8db1fDFf1dab6',
  //       97: '',
  //     },
  //     poolCategory: PoolCategory.CORE,
  //     tokenPerBlock: '30.86',
  //     version: 3,
  //   },
  //   {
  //     sousId: 307,
  //     stakingToken: bscTokens.cake,
  //     earningToken: bscTokens.zbc,
  //     contractAddress: {
  //       56: '0xa683C30d47BCd31fB1399b80A4475bc960b903e3',
  //       97: '',
  //     },
  //     poolCategory: PoolCategory.CORE,
  //     tokenPerBlock: '10.52',
  //     version: 3,
  //   },
  //   {
  //     sousId: 306,
  //     stakingToken: bscTokens.cake,
  //     earningToken: bscTokens.squad,
  //     contractAddress: {
  //       56: '0x08C9d626a2F0CC1ed9BD07eBEdeF8929F45B83d3',
  //       97: '',
  //     },
  //     poolCategory: PoolCategory.CORE,
  //     tokenPerBlock: '2.459',
  //     version: 3,
  //   },
  //   {
  //     sousId: 304,
  //     stakingToken: bscTokens.cake,
  //     earningToken: bscTokens.xcad,
  //     contractAddress: {
  //       56: '0x68Cc90351a79A4c10078FE021bE430b7a12aaA09',
  //       97: '',
  //     },
  //     poolCategory: PoolCategory.CORE,
  //     tokenPerBlock: '0.1102',
  //     version: 3,
  //   },
  //   {
  //     sousId: 303,
  //     stakingToken: bscTokens.cake,
  //     earningToken: bscTokens.mgp,
  //     contractAddress: {
  //       56: '0x365F744c8b7608253697cA2Ed561537B65a3438B',
  //       97: '',
  //     },
  //     poolCategory: PoolCategory.CORE,
  //     tokenPerBlock: '6.944',
  //     version: 3,
  //   },
].map((p) => ({
  ...p,
  stakingToken: p.stakingToken.serialize,
  earningToken: p.earningToken.serialize,
}))

// known finished pools
const finishedPools = [
  // {
  //   sousId: 184,
  //   stakingToken: bscTokens.cake,
  //   earningToken: bscTokens.orbs,
  //   contractAddress: {
  //     97: '',
  //     56: '0x9C8813d7D0A61d30610a7A5FdEF9109e196a3D77',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   tokenPerBlock: '3.8946',
  // },
].map((p) => ({
  ...p,
  isFinished: true,
  stakingToken: p.stakingToken.serialize,
  earningToken: p.earningToken.serialize,
}))

export default [...livePools, ...finishedPools] as Pool.SerializedPoolConfig<SerializedWrappedToken>[]
