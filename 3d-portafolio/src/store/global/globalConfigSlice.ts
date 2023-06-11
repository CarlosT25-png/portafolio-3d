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
  dialogIsCompleteBedroom: boolean
  dialogIsCompleteTimeMachine: boolean,


  // Sounds
  playSoundAllWebsite: boolean,
  playSoundTimeMachine: boolean
}

const initialGlobalConfigState: initialConfig = {
  playAudio: true,
  scene: scenes.TIMEMACHINE, //DEBUG
  isReadyToPlayDialogTimeMachine: false,
  dialogIsCompleteTimeMachine: false,
  dialogIsCompleteBedroom: false,
  playSoundAllWebsite: false,
  playSoundTimeMachine: true
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
    },
    setDialogIsCompleteBedroom(state, action) {
      state.dialogIsCompleteBedroom = action.payload
    },
    setPlaySoundAllWebsite ( state, action ) {
      state.playSoundAllWebsite= action.payload
    },
    setPlaySoundTimeMachine ( state, action ) {
      state.playSoundTimeMachine= action.payload
    }
  },
})

export default globalConfig
