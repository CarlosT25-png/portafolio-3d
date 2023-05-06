import { createSlice } from "@reduxjs/toolkit";

const initialDateState = { day: '01', month:'01', year: '1', hour: '01', minute: '01', availableDays: 31 };

const validateNumber = ( x: number | string ) => {
  const val = typeof x === 'string' ? parseInt(x) : x
  if ( val === 0) return '00'
  return val < 10 ? `0${x}` : `${val}`;
}

const dateSlice = createSlice({
  name: 'date',
  initialState: initialDateState,
  reducers: {
    setDay(state, action) {
      state.day = validateNumber(action.payload)
    },
    setMonth(state, action) {
      state.month = validateNumber(action.payload)
    },
    setYear(state, action) {
      state.year = action.payload
    },
    setHour(state, action) {
      state.hour = validateNumber(action.payload - 1)
    },
    setMinute(state, action) {
      state.minute = validateNumber(action.payload - 1)
    },
    setAvailableDays(state, action) {
      state.availableDays = action.payload
    },
  }
});

export default dateSlice;