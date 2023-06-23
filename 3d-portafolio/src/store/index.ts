import { configureStore } from '@reduxjs/toolkit'
import dateSlice from './timeMachineSlices/date-slice'
import globalConfig from './global/globalConfigSlice'
import animationsBedroomSlice from './bedroomSlices/animation-slice'
import helperSlice from './global/helperSlice'

const store = configureStore({
  reducer: {
    date: dateSlice.reducer,
    globalConfig: globalConfig.reducer,
    animationBedroom: animationsBedroomSlice.reducer,
    helper: helperSlice.reducer,
  },
})

export const dateActions = dateSlice.actions
export const globalConfigActions = globalConfig.actions
export const animationsBedroomActions = animationsBedroomSlice.actions
export const helperActions = helperSlice.actions

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// store.ts
export type AppDispatch = typeof store.dispatch

export default store
