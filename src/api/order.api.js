import axios from "./axios"


export const orderApi = {
    getAll() {
        return axios.get("/order");
    },

    getDetail() {
        return axios.get("/order/detail");
    },

    createOrder() {
        return axios.post("/order")
    },

    getOrderWithDetail(time) {
        return axios.get(`/order?q=${time}`);
    },
    
    getDashboard() {
        return axios.get("/order/dashboard");
    },

    getFeature() {
        return axios.get("/order/feature");  
    },

    getOrders() {
        return axios.get("/order/orders");
    }
}