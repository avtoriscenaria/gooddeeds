import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = null;

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage(state, { payload: messageData }: PayloadAction<any>) {
      return messageData;
    },
    removeMessage(state) {
      return null;
    },
  },
});

export const { setMessage, removeMessage } = messageSlice.actions;
export default messageSlice.reducer;
