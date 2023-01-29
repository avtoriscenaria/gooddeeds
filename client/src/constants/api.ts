export const HOST = "http://localhost:3008";

export const api = {
  auth: {
    login: { method: "POST", url: "/auth/login" },
    signUp: { method: "PUT", url: "/auth/sign-up" },
  },
};
