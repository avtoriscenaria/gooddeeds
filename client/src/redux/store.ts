import { configureStore } from "@reduxjs/toolkit";
import { deedsSlice, userSlice } from "./reducers";

export const store = configureStore({
  reducer: {
    deeds: deedsSlice,
    user: userSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
