import axios from "axios";

// call api without token
export default axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});


// call api with token 
export const axiosPrivate = axios.create({
  baseURL:  import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json'},
  withCredentials: true
})



