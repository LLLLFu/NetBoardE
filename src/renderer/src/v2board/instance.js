import axios , { AxiosHeaders }from "axios";
import config from "../../config.json";
const getBaseUrl = () => {
  return new URL("/api/v1/", config.panelUrl).toString();
};
const instance = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
    Authorization: localStorage.getItem("Authorization") || undefined
  },
  timeout: 5000
});
// Add authorization header to every request
instance.interceptors.request.use((config) => {
	console.log(config);
  const token = localStorage.getItem("Authorization");
  if (!token) {
    if (config.headers instanceof AxiosHeaders) {
      config.headers = config.headers.set("Authorization", token);
    } else {
      config.headers = {
        ...config.headers,
        Authorization: token
      };
    }
  }

  return config;
});
export default instance;