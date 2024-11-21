import { Pagination } from "@/models/api";
import axiosInstance from "@/api/axios-instance";

const prefix = "/users";

export const userApi = {
    async getAll(params: Pagination) {
        const res = await axiosInstance.get(`${prefix}/paginated`, { params });
        return res.data;
    },
}