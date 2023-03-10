export const HOST = "http://localhost:3008";

export const api = {
  auth: {
    login: { method: "POST", url: "/auth/login" },
    signUp: { method: "PUT", url: "/auth/sign-up" },
    refreshToken: { method: "GET", url: "/auth/refresh" },
    logout: { method: "GET", url: "/auth/logout" },
  },
  user: {
    getUser: { method: "GET", url: "/user" },
    deleteAccount: { method: "DELETE", url: "/user" },
    updateNickname: { method: "PATCH", url: "/user" },
  },
  deeds: {
    getUserDeeds: (user_id: string) => ({
      method: "GET",
      url: `/deeds/${user_id}`,
    }),
    getDeeds: {
      method: "GET",
      url: "/deeds",
    },
    getDeed: (id: string) => ({ method: "GET", url: `/deeds/deed/${id}` }),
    addDeed: { method: "PUT", url: "/deeds" },
    updateDeed: (id: string) => ({ method: "PATCH", url: `/deeds/${id}` }),
    deleteDeed: (id: string) => ({ method: "DELETE", url: `/deeds/${id}` }),
  },
  friends: {
    getFriends: { method: "GET", url: "/friends" },
    searchFriends: (nickname: string) => ({
      method: "GET",
      url: `/friends/search?nickname=${nickname}`,
    }),
    addFriend: (_id: string) => ({
      method: "GET",
      url: `/friends/add/${_id}`,
    }),
    deleteFriend: (_id: string) => ({
      method: "DELETE",
      url: `/friends/delete/${_id}`,
    }),
  },
};
