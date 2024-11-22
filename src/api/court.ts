import { Pagination } from "@/models/api";
import axiosInstance from "@/api/axios-instance";
import { Court } from "@/models/court";

const prefix = "/courts";

export const courtApi = {
  async getByCourtType(typeId: string, params: Partial<Pagination>) {
    const res = await axiosInstance.get(`${prefix}/type/${typeId}`, { params });
    return res.data;
  },

  async getById(courtId: string) {
    const res = await axiosInstance.get<Court>(`${prefix}/${courtId}`);
    return res.data;
  },

  async getAvailableDate(courtId: string) {
    const res = await axiosInstance.get<string[]>(
      `${prefix}/${courtId}/get-available-date`
    );
    return res.data;
  },

  async getUnavailableHours(courtId: string, date: string) {
    const res = await axiosInstance.get<string[]>(
      `${prefix}/${courtId}/get-unavailable-hours?date=${date}`
    );
    return res.data;
  },
};
