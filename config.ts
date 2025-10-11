// Use environment variable for BASE_URL to handle both dev and production
const BASE_URL = "https://backend-rest-api-jwt-auth-rolebased.onrender.com"

export const API = {
  LOGIN: `${BASE_URL}/api/auth/login`,
  SIGNUP: `${BASE_URL}/api/auth/register`,
};

export default BASE_URL;
