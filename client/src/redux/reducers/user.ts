import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
  _id: string;
  nickname: string;
  email: string;
}

const initialState: IUserState | null = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state: IUserState | null, { payload: user }: PayloadAction<any>) {
      if (state === null) {
        return user;
      }
      return { ...state, user };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
