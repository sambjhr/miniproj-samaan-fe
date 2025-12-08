import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.backendless.com/<F48A4853-9AED-4949-9608-F6B6EC3AEE8B>/<EE880DAB-840A-47FF-B448-DDF74738909E>",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
