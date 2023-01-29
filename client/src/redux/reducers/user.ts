import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
  _id: string;
  nickname: string;
  email: string;
}

const initialState: { user: IUserState | null } = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, { payload: user }: PayloadAction<any>) {
      return { ...state, user };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
