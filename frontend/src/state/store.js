import { configureStore } from "@reduxjs/toolkit";
import { userSliceReducer } from "./slice/userSlice";
import { messageSliceReducer } from "./slice/messageSlice";

export const store = configureStore({
  reducer: {
    users: userSliceReducer,
    messages: messageSliceReducer,
  },
});
