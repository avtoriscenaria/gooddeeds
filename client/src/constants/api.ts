export const HOST = "http://localhost:3008";

export const api = {
  auth: {
    login: { method: "POST", url: "/auth/login" },
    signUp: { method: "PUT", url: "/auth/sign-up" },
    refreshToken: { method: "GET", url: "/auth/refresh" },
  },
  user: {
    getUser: { method: "GET", url: "/user" },
  },
  deads: {
    getDeeds: { method: "GET", url: "/deeds" },
    getDeed: (id: string) => ({ method: "GET", url: `/deeds/${id}` }),
    addDeed: { method: "PUT", url: "/deeds" },
    updateDeed: (id: string) => ({ method: "PATCH", url: `/deeds/${id}` }),
  },
  friends: {
    getFriends: { method: "GET", url: "/friends" },
    searchFriends: (nickname: string) => ({
      method: "GET",
      url: `/friends/search?nickname=${nickname}`,
    }),
  },
};
