import axios , { AxiosHeaders }from "axios";
import config from "../../config.json";
const getBase = async () => {
  const result = await window.api.getconfig();
  localStorage.setItem("clashsecret",result.secret)
	return "http://"+result['external-controller'];
};
const instance = axios.create({
  baseURL: "",
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
    Authorization:localStorage.getItem("clashsecret")
     },
  timeout: 5000
});
// Add authorization header to every request
instance.interceptors.request.use(async (config) => {
	console.log(config)
  if(!config.baseURL){
    config.baseURL = await getBase();
  }
  let token = localStorage.getItem("clashsecret");
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
