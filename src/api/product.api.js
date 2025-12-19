import axios from "./axios"



export const productApi = {
    getAll() {
        return axios.get("/product")
    },

    getCategory() {
        return axios.get("/product/cate")
    },

    getCount() {
        return axios.get("/product/count")
    },

    getById(id) {
        return axios.get(`/product/${id}`)
    },

    getStock(id) {
        return axios.get(`/product/stock/${id}`)
    },

    addProduct(data) {
        return axios.post("/product/add", data)
    },

    updateInf(id, data) {
        console.log(id)
        return axios.post(`/product/updateInf/${id}`, data)
    },

    updateStock(id) {
        return axios.post(`/product/updateStock/${id}`)
    }
}