import WindowsBasicFrame from '../components/UI/WindowsBasicFrame';
import { createSlice } from '@reduxjs/toolkit';

import txtLogo from '../assets/txt.webp';

const foldersInitialState = {
  folders: [],
  showStartMenu: false,
};

const foldersSlice = createSlice({
  name: 'folders',
  initialState: foldersInitialState,
  reducers: {
    add(state, action) {
      state.folders.push(action.payload);
    },
    delete(state, action) {
      const id = action.payload;
      const idx = state.folders.findIndex((folder) => folder.item.key === id);
      state.folders.splice(idx, 1);
    },
    toggleStartMenu(state, action) {
      state.showStartMenu = action.payload
        ? action.payload
        : !state.showStartMenu;
    },
  },
});

export default foldersSlice;
