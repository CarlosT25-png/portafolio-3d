import { createSlice } from "@reduxjs/toolkit";

const initialDateState = { day: '01', month:'01', year: '2002', hour: '0', minute: '0' };

const validateNumber = ( x: number | string ) => {
  const val = typeof x === 'string' ? parseInt(x) : x
  return val < 10 ? `0${x}` : `${val}`;
}

const dateSlice = createSlice({
  name: 'date',
  initialState: initialDateState,
  reducers: {
    setDay(state, action) {
      state.day = action.payload
    },
    setMonth(state, action) {
      state.month = validateNumber(action.payload)
    },
    setYear(state, action) {
      state.year = action.payload
    },
    setHour(state, action) {
      state.hour = action.payload
    },
    setMinute(state, action) {
      state.minute = action.payload
    },
  }
});

export default dateSlice;