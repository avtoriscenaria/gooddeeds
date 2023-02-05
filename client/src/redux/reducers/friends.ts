import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = null;

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    setFriends(state, { payload: friends }: PayloadAction<any>) {
      return friends;
    },
    addFriend(state, { payload: newFriend }: PayloadAction<any>) {
      return [...(state || []), newFriend];
    },
    deleteFriend(state, { payload: friendId }: PayloadAction<any>) {
      return (state || []).filter((friend: any) => friend._id !== friendId);
    },
  },
});

export const { setFriends, addFriend, deleteFriend } = friendsSlice.actions;
export default friendsSlice.reducer;
