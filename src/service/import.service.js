import { importApi } from "../api/import.api"


export const importService = {
    async postImport(data) {
        const res = await importApi.postImport(data);
        return res.data.success;
    }
}