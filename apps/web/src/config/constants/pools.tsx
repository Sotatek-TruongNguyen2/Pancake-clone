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
    name: <Trans>Auto NIKA</Trans>,
    description: <Trans>Automatic restaking</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 380000,
    tokenImage: {
      primarySrc: `/images/tokens/${bscTokens.cake.address}.svg`,
      secondarySrc: '/images/tokens/autorenew.svg',
    },
  },
  [VaultKey.CakeVault]: {
    name: <Trans>Share NIKA</Trans>,
    description: <Trans>Share, Earn – And more!</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 600000,
    tokenImage: {
      primarySrc: `/images/tokens/${bscTokens.cake.address}.svg`,
      secondarySrc: '/images/tokens/autorenew.svg',
    },
  },
  [VaultKey.CakeFlexibleSideVault]: {
    name: <Trans>Flexible NIKA</Trans>,
    description: <Trans>Flexible staking on the side.</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 500000,
    tokenImage: {
      primarySrc: `/images/tokens/${bscTokens.cake.address}.svg`,
      secondarySrc: '/images/tokens/autorenew.svg',
    },
  },
  [VaultKey.IfoPool]: {
    name: 'IFO NIKA',
    description: <Trans>Stake NIKA to participate in IFOs</Trans>,
    autoCompoundFrequency: 1,
    gasLimit: 500000,
    tokenImage: {
      primarySrc: `/images/tokens/${bscTokens.cake.address}.svg`,
      secondarySrc: `/images/tokens/ifo-pool-icon.svg`,
    },
  },
} as const

export const livePools: Pool.SerializedPoolConfig<SerializedWrappedToken>[] = [
  // {
  //   sousId: 0,
  //   // stakingToken: CAKE_TESTNET,
  //   // earningToken: CAKE_TESTNET,
  //   contractAddress: {
  //     97: '0x6c397dbb4AF0433BFcbc38b8f3380AdaF0aCb53A',
  //     56: '0xa5f8C5Dbd5F286960b9d90548680aE5ebFf07652',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   tokenPerBlock: '10',
  //   isFinished: false,
  // },

  {
    sousId: 0,
    stakingToken: bscTokens.cake,
    earningToken: bscTokens.cake,
    contractAddress: {
      56: '0xa5f8C5Dbd5F286960b9d90548680aE5ebFf07652',
      97: '',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '10',
    isFinished: false,
  },
  {
    sousId: 344,
    stakingToken: bscTokens.cake,
    earningToken: bscTokens.peel,
    contractAddress: {
      56: '0xeBc4E95DF515a34c173530b231EDa53E6a786944',
      97: '',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.9186',
    version: 3,
  },
  // {
  //   sousId: 343,
  //   stakingToken: bscTokens.cake,
  //   earningToken: bscTokens.edu,
  //   contractAddress: {
  //     56: '0x3d2d34Ea77B3702B7634C8D208feC5E08CEa88B6',
  //     97: '',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   tokenPerBlock: '0.05425',
  //   version: 3,
  // },
  // {
  //   sousId: 342,
  //   stakingToken: bscTokens.cake,
  //   earningToken: bscTokens.ush,
  //   contractAddress: {
  //     56: '0x6Db79ba7c0A6DDC48cFDd79Df6cb757b9E8B51DD',
  //     97: '',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   tokenPerBlock: '0.1851',
  //   version: 3,
  // },
  {
    sousId: 341,
    stakingToken: bscTokens.cake,
    earningToken: bscTokens.pstake,
    contractAddress: {
      56: '0x17086aF09D63852aD4646f1f837b34e171bEa99B',
      97: '',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.5497',
    version: 3,
  },
  {
    sousId: 340,
    stakingToken: bscTokens.cake,
    earningToken: bscTokens.champ,
    contractAddress: {
      56: '0x731Aa0b17143A3095430bf322D6aB132cA32b99F',
      97: '',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.432',
    version: 3,
  },
  {
    sousId: 339,
    stakingToken: bscTokens.cake,
    earningToken: bscTokens.axl,
    contractAddress: {
      56: '0xC0878B7907De5d332C6C296E30d14d604AA6ada6',
      97: '',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.01041',
    version: 3,
  },
  {
    sousId: 338,
    stakingToken: bscTokens.cake,
    earningToken: bscTokens.sfund,
    contractAddress: {
      56: '0x4809d86700E1f6be32992172Bd57fD3d954993e7',
      97: '',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.06145',
    version: 3,
  },
  {
    sousId: 336,
    stakingToken: bscTokens.xcad,
    earningToken: bscTokens.cake,
    contractAddress: {
      56: '0x548e422031E9063c21c84C7478EBa0f7ae9641B7',
      97: '',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.009548',
    version: 3,
  },
  {
    sousId: 329,
    stakingToken: bscTokens.hay,
    earningToken: bscTokens.cake,
    contractAddress: {
      56: '0x1c7D573D9614187096276a01Ec15263FCa820BDD',
      97: '',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.0121',
    version: 3,
  },
  {
    sousId: 328,
    stakingToken: bscTokens.cake,
    earningToken: bscTokens.rdnt,
    contractAddress: { 56: '0xb87d170eC2C22F6078C9ed3214aB6f47f4A924D2', 97: '' },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.3342',
    version: 3,
  },
  {
    sousId: 327,
    stakingToken: bscTokens.cake,
    earningToken: bscTokens.id,
    contractAddress: { 56: '0x7aCcC054bB199ca976C95aee495C9888f566AaAA', 97: '' },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.07716',
    version: 3,
  },
  {
    sousId: 326,
    stakingToken: bscTokens.cake,
    earningToken: bscTokens.unw,
    contractAddress: { 56: '0x929641DF8F11b6460efAdb09db357717C60003E1', 97: '' },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.7716',
    version: 3,
  },
  {
    sousId: 325,
    stakingToken: bscTokens.cake,
    earningToken: bscTokens.lvl,
    contractAddress: { 56: '0x1394a09F868bE27B1c8D39D79F0b0D6f112bddAf', 97: '' },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.009765',
    version: 3,
  },
  {
    sousId: 324,
    stakingToken: bscTokens.cake,
    earningToken: bscTokens.caps,
    contractAddress: { 56: '0xA31a351e3FBE3278949242Ff152317c12cd786e2', 97: '' },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '2.7',
    version: 3,
  },
  {
    sousId: 323,
    stakingToken: bscTokens.cake,
    earningToken: bscTokens.sd,
    contractAddress: { 56: '0xaEC63F134a7853C6DaC9BA428d7962cD7C6c5e30', 97: '' },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.01022',
    version: 3,
  },
  {
    sousId: 322,
    stakingToken: bscTokens.cake,
    earningToken: bscTokens.pstake,
    contractAddress: { 56: '0x98AC153577d65f2eEF2256f3AeF8ba9D7E4B756B', 97: '' },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.1186',
    version: 3,
  },
  {
    sousId: 321,
    stakingToken: bscTokens.cake,
    earningToken: bscTokens.csix,
    contractAddress: { 56: '0x8BD7b0d392D2dE8F682704A3186A48467FcDC7AC', 97: '' },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '8.68',
    version: 3,
  },
  {
    sousId: 320,
    stakingToken: bscTokens.cake,
    earningToken: bscTokens.axlusdc,
    contractAddress: {
      56: '0x08287F4942A7B68DDb87D20Becd4fdadF4aE206e',
      97: '',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.0135',
    version: 3,
  },
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
