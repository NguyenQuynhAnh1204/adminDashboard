import { orderApi } from "../api/order.api"


export const orderService = {
    async getAll() {
        const res = await orderApi.getAll();
        return res.data.orders;
    },

    async getDetail() {
        const res = await orderApi.getDetail();
        return res.data.orderDetail;
    },

    async createOrder() {
        const res = await orderApi.createOrder();
        return res.data.success;
    },

    async getOrderWithDetail(time) {
        const res = await orderApi.getOrderWithDetail(time);
        return res.data.orders;
    },

    async getDashboard() {
        const res = await orderApi.getDashboard();
        return res.data.data;
    },
    
    async getFeature() {
        const res = await orderApi.getFeature();
        return res.data.data;
    },

    async getOrders() {
        const res = await orderApi.getOrders();
        return res.data.orders
    }
}