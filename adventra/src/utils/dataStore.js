// src/dataStore/tokenStore.js
export const tokenStore = {
  saveToken: (token) => localStorage.setItem("auth_token", token),
  getToken: () => localStorage.getItem("auth_token"),
  clearToken: () => localStorage.removeItem("auth_token"),
};
