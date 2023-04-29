import { createSlice } from "@reduxjs/toolkit";

const initialDateState = { day: 1, month:1, year: 2002, hour: 0, minute:0 };

const dateSlice = createSlice({
  name: 'date',
  initialState: initialDateState,
  reducers: {
    setDay(state, action) {
      state.day = action.payload
    },
    setMonth(state, action) {
      state.month = action.payload
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