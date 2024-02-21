import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
  },
});

export const { updateUserMode, removeUserMode } = userSlice.actions;

export const userSliceReducer = userSlice.reducer;
