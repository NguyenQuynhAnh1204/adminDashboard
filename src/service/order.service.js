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
    }
}