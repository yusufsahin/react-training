import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',  // Change the base URL as needed
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
