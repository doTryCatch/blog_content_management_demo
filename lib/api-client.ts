import axios from "axios";
import BASE_URL from "@/config";

// Create axios instance with proper configuration for production
export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Clean API client without debug logging

export default apiClient;
