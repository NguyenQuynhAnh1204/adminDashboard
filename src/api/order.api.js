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

    getByEm(id) {
        return axios.get(`/order/em?id=${id}`);
    },

    getRevenue(id) {
        return axios.get(`/order/revenue?id=${id}`);
    },

    getGrowthByEm(id) {
        return axios.get(`/order/growth?id=${id}`);
    },

    getRevenueDay() {
        return axios.get("/order/revenue/day");
    }

    
}