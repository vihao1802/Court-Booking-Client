import axiosInstance from "@/api/axios-instance";
import { CourtImage, CourtImageRequest } from "@/models/court-image";

const prefix = "/court-images";

export const courtImageApi = {
    async updateCourtImage(courtId: string, request: FormData) {
        const res = await axiosInstance.put(`${prefix}/${courtId}`, request, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    }
}