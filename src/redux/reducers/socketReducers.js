// websocketSlice.js
import { createSlice } from '@reduxjs/toolkit';

const websocketSlice = createSlice({
  name: 'websocket',
  initialState: {
    socket: null,
  },
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    clearSocket: (state) => {
      state.socket = null;
    },
  },
});

export const { setSocket, clearSocket } = websocketSlice.actions;
export default websocketSlice.reducer;
