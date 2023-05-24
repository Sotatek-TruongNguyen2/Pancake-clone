import { createSelector } from '@reduxjs/toolkit'
import { State } from '../types'

const selectNikaPoolData = (state: State) => state.nikaPool

export const nikaPoolSelector = createSelector([selectNikaPoolData], (poolData) => {
  return poolData
})
