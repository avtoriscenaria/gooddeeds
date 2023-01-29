import { configureStore } from "@reduxjs/toolkit";
import { deedsSlice } from "./reducers";

export const store = configureStore({
  reducer: {
    deeds: deedsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
