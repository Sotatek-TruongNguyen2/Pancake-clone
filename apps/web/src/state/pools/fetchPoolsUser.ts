import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import erc20ABI from 'config/abi/erc20.json'
import multicall, { multicallv3 } from 'utils/multicall'
import { getAddress, getMulticallAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'
import uniq from 'lodash/uniq'
import fromPairs from 'lodash/fromPairs'
import multiCallAbi from 'config/abi/Multicall.json'

// Pool 0, Cake / Cake is a different kind of contract (master chef)
// BNB pools use the native BNB token (wrapping ? unwrapping is done at the contract level)
const nonBnbPools = poolsConfig.filter((pool) => pool.stakingToken.symbol !== 'BNB')
const bnbPools = poolsConfig.filter((pool) => pool.stakingToken.symbol === 'BNB')
const nonMasterPools = poolsConfig.filter((pool) => pool.sousId !== 0)

const multicallAddress = getMulticallAddress()

export const fetchPoolsAllowance = async (account, chainId?: number) => {
  const calls = nonBnbPools.map((pool) => {
    return {
      address: pool.stakingToken.address,
      name: 'allowance',
      params: [account, getAddress(pool.contractAddress, chainId)],
    }
  })

  const allowances = await multicall(erc20ABI, calls, chainId)
  return fromPairs(nonBnbPools.map((pool, index) => [pool.sousId, new BigNumber(allowances[index]).toJSON()]))
}

export const fetchUserBalances = async (account, chainId?: number) => {
  // Non BNB pools
  const tokens = uniq(nonBnbPools.map((pool) => pool.stakingToken.address))
  const tokenBalanceCalls = tokens.map((token) => ({
    abi: erc20ABI,
    address: token,
    name: 'balanceOf',
    params: [account],
  }))
  const bnbBalanceCall = {
    abi: multiCallAbi,
    address: multicallAddress,
    name: 'getEthBalance',
    params: [account],
  }
  const tokenBnbBalancesRaw = await multicallv3({ calls: [...tokenBalanceCalls, bnbBalanceCall], chainId })
  const bnbBalance = tokenBnbBalancesRaw.pop()
  const tokenBalances = fromPairs(tokens.map((token, index) => [token, tokenBnbBalancesRaw[index]]))

  const poolTokenBalances = fromPairs(
    nonBnbPools
      .map((pool) => {
        if (!tokenBalances[pool.stakingToken.address]) return null
        return [pool.sousId, new BigNumber(tokenBalances[pool.stakingToken.address]).toJSON()]
      })
      .filter(Boolean),
  )

  // BNB pools
  const bnbBalanceJson = new BigNumber(bnbBalance.toString()).toJSON()
  const bnbBalances = fromPairs(bnbPools.map((pool) => [pool.sousId, bnbBalanceJson]))

  return { ...poolTokenBalances, ...bnbBalances }
}

export const fetchUserStakeBalances = async (account, chainId?: number) => {
  const calls = nonMasterPools.map((p) => ({
    address: getAddress(p.contractAddress, chainId),
    name: 'userInfo',
    params: [account],
  }))
  const userInfo = await multicall(sousChefABI, calls, chainId)
  return fromPairs(
    nonMasterPools.map((pool, index) => [pool.sousId, new BigNumber(userInfo[index].amount._hex).toJSON()]),
  )
}

export const fetchUserPendingRewards = async (account, chainId?: number) => {
  const calls = nonMasterPools.map((p) => ({
    address: getAddress(p.contractAddress),
    name: 'pendingReward',
    params: [account],
  }))
  const res = await multicall(sousChefABI, calls, chainId)
  return fromPairs(nonMasterPools.map((pool, index) => [pool.sousId, new BigNumber(res[index]).toJSON()]))
}
