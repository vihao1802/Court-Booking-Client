import { Pagination } from "@/models/api";
import axiosInstance from "@/api/axios-instance";
import { CourtRequest } from "@/models/court";
import { CourtImage } from "@/models/court-image";

const prefix = "/courts";

export const courtApi = {
    async getByCourtType(typeId: string, params: Partial<Pagination>) {
        const res = await axiosInstance.get(`${prefix}/type/${typeId}`, { params });
        return res.data;
    },

    async getById(courtId: string) {
        const res = await axiosInstance.get(`${prefix}/${courtId}`);
        return res.data;
    },

    async createCourt(courtData: CourtRequest) {
        const res = await axiosInstance.post(prefix, courtData);
        return res.data;
    },

    async createCourtImageList(courtId: string, imageList: FormData) {
        console.log(courtId);
        
        const res = await axiosInstance.post(`${prefix}/create-image-list`, imageList, {
            params: {
                "court-id": courtId,
            },
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        
        return res.data;
    },

    async updateCourt(courtId: string, courtData: CourtRequest) {
        const res = await axiosInstance.put(`${prefix}/${courtId}`, courtData);
        return res.data;
    },
}