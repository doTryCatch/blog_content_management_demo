// // lib/api.ts
// import { API } from "@/config";
// import axios from "axios";

// export const loginUser = async (email: string, password: string) => {
//   const res = await axios.post(
//     API.LOGIN,
//     { email, password },
//     { withCredentials: true } // <-- important
//   );

//   return res.data; // backend message, token is in cookie, not returned
// };
