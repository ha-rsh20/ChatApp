import { configureStore } from "@reduxjs/toolkit";
import { userSliceReducer } from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    users: userSliceReducer,
  },
});
