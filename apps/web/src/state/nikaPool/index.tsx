import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { NikaPoolState, NikaPoolUser, SerializedNikaPool } from 'state/types'
import { fetchPoolData } from './fetchPoolData'

export const initialUserData: NikaPoolUser = {
  totalStakes: null,
  totalWithdrawClaimed: null,
  totalClaimed: null,
  claimStakedPerDay: null,
  maxClaim: null,
  vestingDuration: null,
  interestDuration: null,
  lastClaimStaked: null,
  lastUpdatedTime: null,
  lastTimeDeposited: null,
  lastTimeClaimed: null,
  interestRates: null,
  joinByReferral: null,
  directBonus: null,
  matchingBonus: null,
}

export const initialState: NikaPoolState = {
  totalStaked: null,
  f1Referee: null,
  referrer: null,
  poolPendingRewardPerDay: null,
  userData: initialUserData,
}

export const fetchNikaPoolData = createAsyncThunk<SerializedNikaPool, { account: string; chainId?: number }>(
  'nikaPool/fetchNikaPoolData',
  async ({ account, chainId }) => {
    const poolData = await fetchPoolData(account, chainId)
    return poolData
  },
)

export const NikaPoolSlice = createSlice({
  name: 'NikaPool',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<NikaPoolUser>) => {
      const data = action.payload
      state.userData = { ...state.userData, ...data }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNikaPoolData.fulfilled, (state, action: PayloadAction<SerializedNikaPool>) => {
      const { totalStaked, f1Referee, referrer, poolPendingRewardPerDay, userData } = action.payload
      state.totalStaked = totalStaked
      state.f1Referee = f1Referee
      state.referrer = referrer
      state.poolPendingRewardPerDay = poolPendingRewardPerDay
      state.userData = { ...state.userData, ...userData }
    })
  },
})

export const { setUserData } = NikaPoolSlice.actions
export default NikaPoolSlice.reducer
