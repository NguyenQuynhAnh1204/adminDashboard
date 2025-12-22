
import { supApi } from "../api/sup.api";

export const supService = {
    async getAll() {
        const res = await supApi.getAll();

        return res.data.suppliers;
    }
}

