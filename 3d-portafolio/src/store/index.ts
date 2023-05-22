import { configureStore } from '@reduxjs/toolkit';
import dateSlice from './timeMachineSlices/date-slice';
import globalConfig from './global/globalConfigSlice';

const store = configureStore({
  reducer: { date: dateSlice.reducer, globalConfig: globalConfig.reducer }  //Behind the scene, it will merge all the reducer into one big reducer
});

export const dateActions = dateSlice.actions;
export const globalConfigActions = globalConfig.actions;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// store.ts
export type AppDispatch = typeof store.dispatch

export default store;