import axios from "axios";

// call api without token
export default axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true
});


// call api with token 
export const axiosPrivate = axios.create({
  baseURL:  "http://localhost:3000",
  headers: { 'Content-Type': 'application/json'},
  withCredentials: true
})

