import React from 'react'
import axiosInstance from './axios-instance';
import { IReservation } from '@/models/reservation';

const prefix = "reservations";

export const reservationApi = {

    async getMyReservation() {
        return (await axiosInstance.get<IReservation[]>(`${prefix}/my-reservations`)).data;
    }
}