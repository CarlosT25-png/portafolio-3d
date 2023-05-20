import { createSlice } from "@reduxjs/toolkit";

export enum scenes {
  TIMEMACHINE,
  BEDROOM,
  TRANSITION
}

interface initialConfig {
  playAudio: boolean, 
  scene : scenes
}

const initialGlobalConfigState: initialConfig = { playAudio: true, scene: scenes.TIMEMACHINE };

const globalConfig = createSlice({
  name: 'globalConfig',
  initialState: initialGlobalConfigState,
  reducers: {
    setPlayAudio(state, action) {
      state.playAudio = action.payload
    },
    setScene(state, action) {
      state.scene = action.payload
    }
  }
});

export default globalConfig;