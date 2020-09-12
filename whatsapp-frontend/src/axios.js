import axios from "axios";
import { ServerConfig } from "./config/config";

const instance = axios.create({
  baseURL: ServerConfig.serverUrl,
});

export default instance;
