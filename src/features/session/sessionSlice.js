import { createSlice } from '@reduxjs/toolkit';

import { SIGNALR_RECEIVE, SIGNALR_OPEN, SIGNALR_CLOSE, SIGNALR_ERROR } from '../../app/signalRMiddleware'

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    connected: false,
    messages: []
  },
  extraReducers: {
    [SIGNALR_RECEIVE] : (state, action) => {
      state.messages.push(action.payload);
    },
    [SIGNALR_OPEN] : (state, action) => {
      state.connected = true;
    },
    [SIGNALR_CLOSE] : (state, action) => {
      state.connected = false;
    },
    [SIGNALR_ERROR] : (state, action) => {
      alert(action.payload.message);
    },
  }
});

export default sessionSlice.reducer;
