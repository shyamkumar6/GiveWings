import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.1.9:8081", // your local IP
});

export default API;