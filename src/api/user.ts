import { Pagination } from "@/models/api";
import axiosInstance from "@/api/axios-instance";

const prefix = "/users";

export const userApi = {
    async getAll(params: Pagination) {
        const res = await axiosInstance.get(`${prefix}/paginated`, { params });
        return res.data;
    },

    async disableUser(id: string, { isDisabled }: { isDisabled: number }) {
        const res = await axiosInstance.put(`${prefix}/${id}/disable-user`, { isDisabled });
        return res.data;
    },
}