import axios, { AxiosInstance } from "axios";

const movieAPI: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 5000
  })

export default movieAPI