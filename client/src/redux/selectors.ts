export const getUser = (state: any) => state.user;
export const getUserFriends = (state: any) => state.user?.friends || [];
export const getFriends = (state: any) => state.friends;
export const getMessage = (state: any) => state.message;
