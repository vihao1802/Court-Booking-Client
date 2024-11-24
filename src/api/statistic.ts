import { Dayjs } from "dayjs";
import axiosInstance from "./axios-instance";

const prefix = "statistic";
export const statisticApi = {
    async getTotalBookingHours(startAt: Dayjs, endAt: Dayjs) {
        const res = await axiosInstance.get(`${prefix}/total-booking-hours`, {
            params: {
                startDate: startAt.format("YYYY-MM-DD"),
                endDate: endAt.format("YYYY-MM-DD"),
            },
        }
        );
        return res;
    },
    async getTotalRevenue(startAt: Dayjs, endAt: Dayjs) {
        const res = await axiosInstance.get(`${prefix}/total-revenue`, {
            params: {
                startDate: startAt.format("YYYY-MM-DD"),
                endDate: endAt.format("YYYY-MM-DD"),
            },
        }
        );
        return res;
    },

    async getTotalUser(startAt: Dayjs, endAt: Dayjs) {
        const res = await axiosInstance.get(`${prefix}/total-new-user`, {
            params: {
                startDate: startAt.format("YYYY-MM-DD"),
                endDate: endAt.format("YYYY-MM-DD"),
            },
        }
        );
        return res;
    },

    async getTotalRevenueByMonth(startAt: Dayjs, endAt: Dayjs) {
        const res = await axiosInstance.get(`${prefix}/revenue-by-month`, {
            params: {
                startDate: startAt.format("YYYY-MM-DD"),
                endDate: endAt.format("YYYY-MM-DD"),
            },
        }
        );
        return res;
    },

    async getLatestReservation(limit: number) {
        const res = await axiosInstance.get(`reservations/latest`, {
            params: {
                limit:limit
            },
        }
        );
        return res;
    },

};