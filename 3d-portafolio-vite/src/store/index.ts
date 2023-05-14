import { configureStore } from '@reduxjs/toolkit';
import dateSlice from './timeMachineSlices/date-slice';


const store = configureStore({
  reducer: { date: dateSlice.reducer }  //Behind the scene, it will merge all the reducer into one big reducer
});

export const dateActions = dateSlice.actions;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// store.ts
export type AppDispatch = typeof store.dispatch

export default store;