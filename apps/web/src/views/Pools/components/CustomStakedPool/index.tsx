import { Pool, useMatchBreakpoints } from '@pancakeswap/uikit'
import React, { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { Token } from '@pancakeswap/sdk'
import { formatLpBalance } from '@pancakeswap/utils/formatBalance'
import { readContracts, useAccount } from 'wagmi'
import { useNikaStakingContract } from 'hooks/useContract'
import nikaStakingAbi from 'config/abi/nikaStakingAbi.json'
import ActionPanel from './ActionPanel'
import NameCell from './NameCell'
import TotalStakedCell from '../PoolsTable/Cells/TotalStakedCell'
import AutoEarningsCell from './AutoEarningsCell'
import Status from './Status'

const CustomStakedPool = () => {
  const { isXs, isSm, isMd, isLg, isXl, isXxl } = useMatchBreakpoints()
  const isLargerScreen = isLg || isXl || isXxl
  const isXLargerScreen = isXl || isXxl

  const { address: account } = useAccount()
  const [totalStaked, setTotalStaked] = useState(0)
  const nikaStakingContract = useNikaStakingContract()

  useEffect(() => {
    const getContracstData = async () => {
      const stakingContract = {
        address: nikaStakingContract.address,
        abi: nikaStakingAbi,
        chainId: 97,
      }
      const [_totalStaked] = await readContracts({
        contracts: [
          {
            ...stakingContract,
            functionName: 'getTotalStaked',
          },
        ],
      })

      // const totalStakes = userInformation[0]
      console.log('_totalStaked: ', _totalStaked)

      const amount = formatLpBalance(new BigNumber(_totalStaked.toString()), 18)
      console.log('_totalStaked: ', Number(amount))
      setTotalStaked(Number(amount))
    }
    getContracstData()
  }, [])

  return (
    <Pool.ExpandRow panel={<ActionPanel expanded breakpoints={{ isXs, isSm, isMd, isLg, isXl, isXxl }} />}>
      <NameCell title="Stake NIKA" />
      {isXLargerScreen && <AutoEarningsCell />}
      {isLargerScreen && (
        <TotalStakedCell
          stakingToken={new Token(56, '0x483Ed007BA31da2D570bA816F028135d1F0c60A6', 18, 'NIKA')}
          totalStaked={new BigNumber(totalStaked || 0)}
          totalStakedBalance={totalStaked}
        />
      )}
      <Status status="Active" />
    </Pool.ExpandRow>
  )
}

export default CustomStakedPool
