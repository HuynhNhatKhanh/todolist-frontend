import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://54.211.223.242",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
