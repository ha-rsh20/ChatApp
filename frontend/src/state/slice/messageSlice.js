import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: [],
};

export const messageSlice = createSlice({
  name: "message",
  initialState: initialState,
  reducers: {
    updateMessage: (state, action) => {
      state.message = action.payload;
    },
    removeMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { updateMessage, removeMessage } = messageSlice.actions;

export const messageSliceReducer = messageSlice.reducer;
