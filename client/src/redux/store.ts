import { configureStore } from "@reduxjs/toolkit";
import { userSlice, friendsSlice, messageSlice } from "./reducers";

export const store = configureStore({
  reducer: {
    user: userSlice,
    friends: friendsSlice,
    message: messageSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
