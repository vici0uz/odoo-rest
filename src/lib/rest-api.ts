import axios, { AxiosInstance } from "axios";

const restClient: AxiosInstance = axios.create({
  headers: {
    "Content-type": "application/json",
  },
});
export default restClient;
