import { createSlice } from '@reduxjs/toolkit'

export enum scenes {
  TIMEMACHINE,
  BEDROOM,
  TRANSITION,
}

interface initialConfig {
  playAudio: boolean
  scene: scenes
  isReadyToPlayDialogTimeMachine: boolean
  dialogIsCompleteTimeMachine: boolean
}

const initialGlobalConfigState: initialConfig = {
  playAudio: true,
  scene: scenes.TIMEMACHINE,
  isReadyToPlayDialogTimeMachine: false,
  dialogIsCompleteTimeMachine: false
}

const globalConfig = createSlice({
  name: 'globalConfig',
  initialState: initialGlobalConfigState,
  reducers: {
    setPlayAudio(state, action) {
      state.playAudio = action.payload
    },
    setScene(state, action) {
      state.scene = action.payload
    },
    setIsReadyToPlayDialogTimeMachine(state, action) {
      state.isReadyToPlayDialogTimeMachine = action.payload
    },
    setDialogIsCompleteTimeMachine(state, action) {
      state.dialogIsCompleteTimeMachine = action.payload
    }
  },
})

export default globalConfig
