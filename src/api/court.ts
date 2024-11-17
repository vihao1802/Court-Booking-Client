import { Pagination } from "@/models/api";
import axiosInstance from "@/api/axios-instance";

const prefix = "/courts";

export const courtApi = {
    async getByCourtType(typeId: string, params: Partial<Pagination>) {
        const res = await axiosInstance.get(`${prefix}/type/${typeId}`, { params });
        return res.data;
    },

    async getById(courtId: string) {
        const res = await axiosInstance.get(`${prefix}/${courtId}`);
        return res.data;
    }
}