import { userApi } from "../api/auth.api"


export const userService = {
    async getUsers() {
        const res = await userApi.getAll();

        return res.data.data;
    },

    async getById(id) {
        const res = await userApi.getById(id);
        return {
                name: res.data.user.name,
                phone: res.data.user.phone,
                email: res.data.user.email,
                birthday: res.data.user.birthday && res.data.user.birthday.split("T")[0],
                address: res.data.user.address,
                avatar: res.data.user.avatar,
            }
    },

    async addUser(data) {
        return userApi.addUser(data);
    },

    async updateUser(id, data) {
        return userApi.updateUser(id, data);
    },

    async deleteUser(userId) {
        return userApi.deleteUser(userId); 
    }
}