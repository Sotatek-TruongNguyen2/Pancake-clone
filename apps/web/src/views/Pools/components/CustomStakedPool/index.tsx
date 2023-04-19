import { Pool, useMatchBreakpoints } from '@pancakeswap/uikit'
import React from 'react'
import BigNumber from 'bignumber.js'
import { Token } from '@pancakeswap/sdk'
import ActionPanel from './ActionPanel'
import NameCell from './NameCell'
import TotalStakedCell from '../PoolsTable/Cells/TotalStakedCell'
import AutoEarningsCell from './AutoEarningsCell'
import Status from './Status'

const CustomStakedPool = () => {
  const { isXs, isSm, isMd, isLg, isXl, isXxl } = useMatchBreakpoints()
  const isLargerScreen = isLg || isXl || isXxl
  const isXLargerScreen = isXl || isXxl

  return (
    <Pool.ExpandRow
      panel={
        <ActionPanel
          expanded
          breakpoints={{ isXs, isSm, isMd, isLg, isXl, isXxl }}
          account="0x4588eAd0dcCfD060aACaA90b3d022389eeA22995"
        />
      }
    >
      <NameCell />
      {isXLargerScreen && <AutoEarningsCell />}
      {isLargerScreen && (
        <TotalStakedCell
          stakingToken={new Token(56, '0x483Ed007BA31da2D570bA816F028135d1F0c60A6', 18, 'NIKA')}
          totalStaked={new BigNumber(0)}
          totalStakedBalance={0}
        />
      )}
      <Status status="Active" />
    </Pool.ExpandRow>
  )
}

export default CustomStakedPool
