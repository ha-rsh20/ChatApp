import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rid: 0,
  mode: "dark",
};

export const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    updateUserMode: (state, action) => {
      state.mode = action.payload;
    },
    removeUserMode: (state, action) => {
      state.mode = action.payload;
    },
    updateUserReceiver: (state, action) => {
      state.rid = action.payload;
    },
    removeUserReceiver: (state, action) => {
      state.rid = action.payload;
    },
  },
});

export const {
  updateUserMode,
  removeUserMode,
  updateUserReceiver,
  removeUserReceiver,
} = userSlice.actions;

export const userSliceReducer = userSlice.reducer;
