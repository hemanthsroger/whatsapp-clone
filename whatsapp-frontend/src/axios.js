import axios from "axios";

const instance = axios.create({
  baseURL: "https://whatsapp-clone-hemi.herokuapp.com",
});

export default instance;
