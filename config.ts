// Use environment variable for BASE_URL to handle both dev and production
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? "https://backend-rest-api-jwt-auth-rolebased.onrender.com" 
    : "http://localhost:4000");

export const API = {
  LOGIN: `${BASE_URL}/auth/login`,
  SIGNUP: `${BASE_URL}/auth/register`,
};

export default BASE_URL;
