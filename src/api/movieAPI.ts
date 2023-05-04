import axios, { AxiosInstance } from "axios";
import { apiUrl } from "../config";

const movieAPI: AxiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 5000
  })

export default movieAPI