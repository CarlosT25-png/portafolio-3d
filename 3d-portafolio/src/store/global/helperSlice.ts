import { createSlice } from '@reduxjs/toolkit'

export enum ObjectsToFocus {
  ALL,
  DESKTOP,
  GAMEBOY,
  PICTURES,
}

interface Helpers {
  showHelperGameConsole: boolean
  gameConsoleHelperHasShown: boolean
  showHelperPolaroids: boolean
  polaroidsHelperHasShown: boolean
  showHelperMonitor: boolean
  monitorHelperHasShown: boolean
}

const initialHelperState: Helpers = {
  showHelperGameConsole: false,
  gameConsoleHelperHasShown: false,
  showHelperPolaroids: false,
  polaroidsHelperHasShown: false,
  showHelperMonitor: false,
  monitorHelperHasShown: false
}

const helperSlice = createSlice({
  name: 'helper',
  initialState: initialHelperState,
  reducers: {
    setShowHelperGameConsole(state, action) {
      state.showHelperGameConsole = action.payload
    },
    setGameConsoleHelperHasShown(state, action) {
      state.gameConsoleHelperHasShown = action.payload
    },
    setShowHelperPolaroids(state, action) {
      state.showHelperPolaroids = action.payload
    },
    setPolaroidsHelperHasShown(state, action) {
      state.polaroidsHelperHasShown = action.payload
    },
    setShowHelperMonitor(state, action) {
      state.showHelperMonitor = action.payload
    },
    setMonitorHelperHasShown(state, action) {
      state.monitorHelperHasShown = action.payload
    },
    
  },
})

export default helperSlice
