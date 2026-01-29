import axios from "axios";

const MockHttpInstance = axios.create({
  baseURL: "",
  timeout: 10000,
});

export default MockHttpInstance;
