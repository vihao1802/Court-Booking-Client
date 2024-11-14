export interface IReservation{
    id: string;
    userId: string;
    courtId: string;
    checkInTime: Date;
    checkOutTime: Date;
    totalPrice: number;
    reservationDate: Date;
    reservationState: number;
    paymentMethod?:string ;

}