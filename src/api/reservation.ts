import {
  MomoPaymentRequest,
  Reservation,
  ReservationRequest,
  UpdateReservationRequest,
} from "@/models/reservation";
import { Pagination, ReservationPagination } from "@/models/api";
import axiosInstance from "./axios-instance";

export const reservationApi = {
  async getReservationById(reservationId: string) {
    const res = await axiosInstance.get<Reservation>(
      `/reservations/${reservationId}`
    );
    return res.data;
  },
  async getReservations(params: ReservationPagination) {
    const res = await axiosInstance.get("/reservations/paginated", {
      params,
    });

    return res.data;
  },
  async getMyReservation(params: Partial<Pagination & { sort?: string }>) {
    const res = await axiosInstance.get("/reservations/my-reservations", {
      params,
    });
    return res.data;
  },

  async getInvoice(id: String) {
    const res = await axiosInstance.get(`/reservations/${id}/getInvoice`, {
      responseType: "arraybuffer", // Đảm bảo nhận dữ liệu dạng byte[]
    });
    return res.data;
  },

  async updateReservation(id: string, data: UpdateReservationRequest) {
    const res = await axiosInstance.put<Reservation>(
      `/reservations/${id}`,
      data
    );
    return res.data;
  },
  async createReservation(data: ReservationRequest) {
    const res = await axiosInstance.post<Reservation>("/reservations", data);
    return res.data;
  },
  async createPaymentZaloPay(reservationId: string) {
    const res = await axiosInstance.post(
      `/reservations/${reservationId}/payment/zalo-pay`
    );
    return res;
  },
  async createPaymentMomo(reservationId: string, request: MomoPaymentRequest) {
    const res = await axiosInstance.post(
      `/reservations/${reservationId}/payment/momo`,
      request
    );
    return res.data;
  },
};
