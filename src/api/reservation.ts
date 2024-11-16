import {
  MomoPaymentRequest,
  Reservation,
  ReservationRequest,
} from "@/models/reservation";
import axiosInstance from "./axios-instance";

export const reservationApi = {
  async getReservation(reservationId: string) {
    const res = await axiosInstance.get<Reservation>(
      `/reservations/${reservationId}`
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
