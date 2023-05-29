import { configureStore } from '@reduxjs/toolkit';
import foldersSlice from './foldersSlice';

const store = configureStore({
  reducer: {folders: foldersSlice.reducer},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});

export const foldersActions = foldersSlice.actions;

export default store;