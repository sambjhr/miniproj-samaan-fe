import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://neatmarble-us.backendless.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
