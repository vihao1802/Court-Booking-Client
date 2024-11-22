import { ReservationState, PaymentMethod } from "@/types/enums";
import { User } from "./user";
import { Court } from "./court";

export interface ReservationBase {
  reservationDate: string;
  checkInTime: string;
  checkOutTime: string;
  totalPrice: number;
  createdAt: string;
}

export interface Reservation extends ReservationBase {
  id: string;
  reservationState: ReservationState;
  paymentMethod: PaymentMethod;
  user: User;
  court: Court;
  createdAt: string;
}

export interface ReservationRequest extends ReservationBase {
  userId: string;
  courtId: string;
}

export interface UpdateReservationRequest {
  reservationState: ReservationState;
  paymentMethod: PaymentMethod;
}

export interface MomoPaymentRequest {
  requestType: string;
}
