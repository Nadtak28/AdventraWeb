// src/api/axiosInstance.js
import axios from "axios";
import { tokenStore } from "../utils/dataStore";
const MoujaasAuth = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Accept-Language": "er",
    Authorization: `Bearer ${tokenStore.getToken()}`,
  },
});

// MoujaasAuth.interceptors.request.use();

// MoujaasAuth.interceptors.response.use(
//   () => {},
//   () => {}
// );

export default MoujaasAuth;
