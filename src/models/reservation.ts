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
  reservationState: string;
  paymentMethod: string;
}

export interface ReservationRequest extends ReservationBase {}

export interface MomoPaymentRequest {
  requestType: string;
}
