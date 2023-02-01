export const getUser = (state: any) => state.user;
export const getUserFriends = (state: any) => state.user?.friends || [];
