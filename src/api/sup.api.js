import axios from "./axios";


export const supApi = {
    getAll() {
        return axios.get("/supp");
    }
}

