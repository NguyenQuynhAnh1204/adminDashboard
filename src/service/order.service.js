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
    
    async getOrderEM(id) {
        const res = await orderApi.getByEm(id);
        return res.data.orders;
    },

    async getRevenue(id) {
        const res = await orderApi.getRevenue(id);
        return res.data.revenue;
    },

    async getGrowthByEm(id) {
        const res = await orderApi.getGrowthByEm(id);
        return res.data.growth;
    },

    async getRevenueDay() {
        const res = await orderApi.getRevenueDay();
        return {
            avg: Number(res.data.avg),
            revenue: Number(res.data.revenue),
            growthDay: Math.floor(Number(res.data.growthDay)),
            growthMonth: Math.floor(Number(res.data.growthMonth))
        }
    }
}