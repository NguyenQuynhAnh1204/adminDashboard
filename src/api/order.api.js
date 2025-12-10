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
    }
}