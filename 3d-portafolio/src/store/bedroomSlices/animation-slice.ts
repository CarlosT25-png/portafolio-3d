import { createSlice } from "@reduxjs/toolkit";

export enum ObjectsToFocus {
  ALL,
  DESKTOP,
  GAMEBOY,
  PICTURES
}

const initialAnimationState  : { isFocusAnObject: ObjectsToFocus, isUsingControls: boolean } = { isFocusAnObject: ObjectsToFocus.ALL, isUsingControls: false };

const animationsBedroomSlice = createSlice({
  name: 'animationsBedroom',
  initialState: initialAnimationState,
  reducers: {
    setIsFocusAnObject(state, action) {
      state.isFocusAnObject = action.payload
    },
    setIsUsingControls(state, action) {
      state.isUsingControls = action.payload
    }
  }
});

export default animationsBedroomSlice;