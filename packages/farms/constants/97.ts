import { bscTestnetTokens } from '@pancakeswap/tokens'
import { SerializedFarmConfig } from '@pancakeswap/farms'

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 2, 3) should always be at the top of the file.
   */
  // {
  //   pid: 0,
  //   lpSymbol: 'CAKE',
  //   lpAddress: '0x36e3E4fF6471559b19F66bD10985534d5e214D44',
  //   token: bscTestnetTokens.syrup,
  //   quoteToken: bscTestnetTokens.wbnb,
  // },
  {
    pid: 1,
    lpSymbol: 'CAKE-BNB LP',
    lpAddress: '0x6de93e48c687924b6f0e5ea44c7d8b08591da4d1',
    token: bscTestnetTokens.cake,
    quoteToken: bscTestnetTokens.wbnb,
    boosted: true,
  },
  {
    pid: 2,
    lpSymbol: 'BNB-BUSD LP',
    lpAddress: '0x4E96D2e92680Ca65D58A0e2eB5bd1c0f44cAB897',
    token: bscTestnetTokens.busd,
    quoteToken: bscTestnetTokens.wbnb,
  },
  // {
  //   pid: 2,
  //   v1pid: 251,
  //   lpSymbol: 'CAKE-BNB LP',
  //   lpAddress: '',
  //   token: bscTokens.cake,
  //   quoteToken: bscTokens.wbnb,
  //   boosted: true,
  // },
].map((p) => ({ ...p, token: p.token.serialize, quoteToken: p.quoteToken.serialize }))

export default farms
