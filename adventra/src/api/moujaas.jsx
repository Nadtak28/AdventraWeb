// src/api/axiosInstance.js
import axios from "axios";

const Moujaas = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Accept":"application/json",
    "Content-Type":"application/json",
    "Accept-Language":"ar"
  },
});

export default Moujaas;
