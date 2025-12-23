import axios from "./axios"


export const userApi = {
   getAll() {
    return axios.get("/user");
   },

   getById(id) {
    return axios.get(`user/${id}`);
   },

   getCount() {
    return axios.get("/user/count");
   },
   
   updateUser(id, data) {
    return axios.post(`/user/update?q=${id}`, data); 
   },

   addUser(data) {
    return axios.post("/user/add", data);
   },

   deleteUser(id) {
    return axios.delete(`/user/delete/${id}`)
   },

   // lấy danh sách order theo ngày/tháng
   getOrder(id, time) {
      return axios.get(`/user/order/${id}?q=${time}`);
   },

   getDashboard(id, time) {
      return axios.get(`/user/dashboard/${id}?q=${time}`);
   },
}




