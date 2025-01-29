import axios from 'axios';
import { useSelector } from 'react-redux';

const API_URL = import.meta.env.VITE_APP_BACKEND_URL;

// Create an axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create a function to set up the interceptors
export const useApiClient = () => {
  const token = useSelector((state) => state.loginUser.user?.data?.auth_token);
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>", token);
  

  // Add a request interceptor
  apiClient.interceptors.request.use(
    (config) => {
      if (token) {
        // Attach the token to the Authorization header
        config.headers['Authorization'] = `Token ${token}`;
      }
      return config;
    },
    (error) => {
      // Handle request errors
      return Promise.reject(error);
    }
  );

  return apiClient;
};

export default apiClient; 