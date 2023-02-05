import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
  _id: string;
  nickname: string;
  email: string;
  friends: string[];
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
    //@ts-ignore
    addFriend(
      state: IUserState | null,
      { payload: friend_id }: PayloadAction<any>
    ): IUserState | null {
      if (state !== null) {
        return { ...state, friends: [...(state.friends || []), friend_id] };
      }
      return state;
    },
    //@ts-ignore
    deleteFriend(
      state: IUserState | null,
      { payload: friend_id }: PayloadAction<any>
    ): IUserState | null {
      if (state !== null) {
        return {
          ...state,
          friends: (state.friends || []).filter(
            (_friend_id: string) => _friend_id !== friend_id
          ),
        };
      }
      return state;
    },
    updateUser(
      state: IUserState | null,
      { payload: newUserData }: PayloadAction<any>
    ) {
      if (state !== null) {
        return { ...state, ...newUserData };
      }
      return state;
    },
  },
});

export const { setUser, addFriend, deleteFriend, updateUser } =
  userSlice.actions;
export default userSlice.reducer;
