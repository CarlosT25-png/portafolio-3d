import { configureStore } from '@reduxjs/toolkit';
import dateSlice from './timeMachineSlices/date-slice';
import globalConfig from './global/globalConfigSlice';
import animationsBedroomSlice from './bedroomSlices/animation-slice';

const store = configureStore({
  reducer: { date: dateSlice.reducer, globalConfig: globalConfig.reducer, animationBedroom: animationsBedroomSlice.reducer }  //Behind the scene, it will merge all the reducer into one big reducer
});

export const dateActions = dateSlice.actions;
export const globalConfigActions = globalConfig.actions;
export const animationsBedroomActions = animationsBedroomSlice.actions;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// store.ts
export type AppDispatch = typeof store.dispatch

export default store;