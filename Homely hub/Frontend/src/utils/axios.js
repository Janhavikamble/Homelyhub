// import axios from "axios";
// import qs from "qs";

// // Serialization means converting a JavaScript object or array into a URL query string that can be sent in an HTTP request.

// export const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   withCredentials: true,
//   paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
// });

// axiosInstance.js
import axios from 'axios';
import qs from 'qs';

// Choose API base depending on environment
const API_BASE = import.meta.env.DEV
  ? '/api' // use dev proxy in development
  : import.meta.env.VITE_API_URL; // production URL from Vercel env

export const axiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
});
