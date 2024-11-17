import { ReservationState, PaymentMethod } from "@/types/enums";

export interface ReservationBase {
  reservationDate: string;
  checkInTime: string;
  checkOutTime: string;
  totalPrice: number;
  userId: string;
  courtId: string;
}

export interface Reservation extends ReservationBase {
  id: string;
  reservationState: ReservationState;
  paymentMethod: PaymentMethod;
}

export interface ReservationRequest extends ReservationBase {}

export interface UpdateReservationRequest {
  reservationState: ReservationState;
  paymentMethod: PaymentMethod;
}

export interface MomoPaymentRequest {
  requestType: string;
}
