import { productApi } from "../api/product.api"



export const productService = {

    async getAll() {
        const res = await productApi.getAll();
        return res.data.products;
    },

    async getPos(key) {
        const res = await productApi.getPos(key);
        return res.data.products;
    },

    async getById(id) {
        const res = await productApi.getById(id);
        const product = res.data.product;
        return {
                name: product.name,
                barcode: product.barcode,
                cateName: product.cateName,
                brandName: product.brandName,
                unit: product.unit,
                variant: product.variant,
                price: product.price,
                expiry_date: product.expiry_date && product.expiry_date.split("T")[0],
                path: product.path
            };
    },
    
    async getStock(id) {
        const res = await productApi.getStock(id);
        const stock = res.data.stock;
        return {
                quantity: stock.quantity,
                cost: stock.cost,
                stock: stock.stock,
                status: stock.quantity > stock.stock ? 1 : 0
            }
    },

    async addProduct(data) {
        const res =  await productApi.addProduct(data);
        return res.data.success;
    },

    async updateInf(id, data) {
        console.log(id);
        console.log(data);
        const res = await productApi.updateInf(id, data);
        return res.data.success;
    },
}