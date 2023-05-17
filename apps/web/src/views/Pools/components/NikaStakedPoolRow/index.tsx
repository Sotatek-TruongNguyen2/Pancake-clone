import { Pool, useMatchBreakpoints } from '@pancakeswap/uikit'
import { NikaPoolState } from 'state/types'
import { useNikaPool } from 'state/pools/hooks'
import React, { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { Token } from '@pancakeswap/sdk'
import { formatLpBalance } from '@pancakeswap/utils/formatBalance'
import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import { NIKA_ADDR } from 'config/constants/nikaContract'
import { useOracleContract } from 'hooks/useContract'
import ActionPanel from './ActionPanel'
import NameCell from './NameCell'
import TotalStakedCell from '../PoolsTable/Cells/TotalStakedCell'
import AutoEarningsCell from './AutoEarningsCell'
import Status from './Status'

const StyledCell = styled(Pool.BaseCell)`
  flex: 1;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex: 1 0 120px;
  }
`

const NikaStakedPoolRow = () => {
  const { t } = useTranslation()
  const { isXs, isSm, isMd, isLg, isXl, isXxl } = useMatchBreakpoints()
  const isLargerScreen = isLg || isXl || isXxl
  const isXLargerScreen = isXl || isXxl
  const [usdcAmount, setUsdcAmount] = useState(0)
  const oracleContract = useOracleContract()
  const { totalStaked, poolPendingRewardPerDay } = useNikaPool() as NikaPoolState
  const _totalStaked = formatLpBalance(new BigNumber(totalStaked), 18)

  const pendingReward = Number(formatLpBalance(new BigNumber(poolPendingRewardPerDay), 18))

  useEffect(() => {
    const fetchData = async () => {
      if (!pendingReward) return
      const _usdcAmount = await oracleContract.consult(
        NIKA_ADDR,
        new BigNumber(pendingReward || 0).times(new BigNumber(10).pow(18)).toString(),
      )
      setUsdcAmount(new BigNumber(_usdcAmount.toString() || 0).dividedBy(new BigNumber(10).pow(18)).toNumber())
    }
    fetchData()
  }, [pendingReward])

  return (
    <Pool.ExpandRow panel={<ActionPanel expanded breakpoints={{ isXs, isSm, isMd, isLg, isXl, isXxl }} />}>
      <NameCell title={t('Stake NIKA')} />
      {isXLargerScreen && (
        <AutoEarningsCell earningTokenBalance={pendingReward} earningTokenDollarBalance={usdcAmount} />
      )}
      <Status status={t('Active')} />
      <StyledCell />
      {isLargerScreen && (
        <TotalStakedCell
          stakingToken={new Token(56, '0x483Ed007BA31da2D570bA816F028135d1F0c60A6', 18, 'NIKA')}
          totalStaked={new BigNumber(totalStaked || 0)}
          totalStakedBalance={Number(_totalStaked)}
        />
      )}
    </Pool.ExpandRow>
  )
}

export default NikaStakedPoolRow
