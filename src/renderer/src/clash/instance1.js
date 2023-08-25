import axios , { AxiosHeaders }from "axios";
import config from "../../config.json";
const getBaseUrl = () => {
	return "http://localhost:4691/";
};
const instance = axios.create({
  baseURL: getBaseUrl(),
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
    Authorization: localStorage.getItem("clashsecret") || "Bearer 0755ca23-dba3-42fc-843e-a924ed9add95"
  },
  timeout: 5000
});
// Add authorization header to every request
instance.interceptors.request.use((config) => {
	console.log(config);
  const token = localStorage.getItem("clashsecret");
  if (!token) {
    if (config.headers instanceof AxiosHeaders) {
      config.headers = config.headers.set("clashsecret", token);
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