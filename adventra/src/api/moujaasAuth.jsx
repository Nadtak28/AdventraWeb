// src/api/axiosInstance.js
import axios from "axios";
import { tokenStore } from "../utils/dataStore";

const MoujaasAuth = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Accept-Language": "en", // maybe you meant "en" not "er"?
  },
});

// Always attach the latest token before sending a request
MoujaasAuth.interceptors.request.use(
  (config) => {
    const token = tokenStore.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default MoujaasAuth;
