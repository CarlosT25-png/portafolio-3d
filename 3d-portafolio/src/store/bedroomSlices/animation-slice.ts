import { createSlice } from "@reduxjs/toolkit";

const initialAnimationState = { isFocusAnObject: false };

const animationsBedroomSlice = createSlice({
  name: 'animationsBedroom',
  initialState: initialAnimationState,
  reducers: {
    setIsFocusAnObject(state, action) {
      state.isFocusAnObject = action.payload
    }
  }
});

export default animationsBedroomSlice;