// config.js
const BASE_URL = "https://backend-rest-api-jwt-auth-rolebased.onrender.com";
// const BASE_URL = "http://localhost:4000";

export const API = {
  LOGIN: `${BASE_URL}/auth/login`,
  SIGNUP: `${BASE_URL}/auth/register`,
};

export default BASE_URL;
