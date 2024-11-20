import { UnauthorizedError } from "@/api/http-errors";
import { reservationApi } from "@/api/reservation";
import React from "react";
import useSWR, { SWRConfiguration } from "swr";

export const useGetMyReservation = (options?: Partial<SWRConfiguration>) => {
  const {
    data: reservationList,
    isLoading,
    error,
    mutate,
  } = useSWR(
    "reservation",
    async () => {
      try {
        return await reservationApi.getMyReservation();
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          return null;
        } else {
          throw error;
        }
      }
    },
    {
      ...options,
      revalidateOnFocus: false,
    }
  );
  return { reservationList, isLoading, error, mutate };
};
