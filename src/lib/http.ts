import axios, { AxiosInstance } from 'axios';

const client: AxiosInstance = axios.create({
    responseType:"arraybuffer"

  })
export default client