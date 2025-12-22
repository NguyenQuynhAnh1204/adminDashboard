

import axios from "./axios";

export const importApi = {
    postImport(data) {
        return axios.post("/import", data)
    }
}