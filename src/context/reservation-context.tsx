import { useGetMyReservation } from "@/hooks/reservation/useGetMyReservation";
import { Reservation } from "@/models/reservation";
import { createContext, useEffect, useState } from "react";

interface ReservationContextType {
  reservationData: Reservation[];
  setReservationData: React.Dispatch<React.SetStateAction<Reservation[]>>;
}
export const ReservationContext = createContext<ReservationContextType | null>(
  null
);

interface ReservationProviderProps {
  children: React.ReactNode;
}
export const ReservationProvider: React.FC<ReservationProviderProps> = ({
  children,
}: ReservationProviderProps) => {
  const [reservationData, setReservationData] = useState<Reservation[]>([]);
  const { data } = useGetMyReservation({ enabled: true });
  useEffect(() => {
    if (data) {
      setReservationData(data);
    }
  }, [data]);

  return (
    <ReservationContext.Provider
      value={{ reservationData, setReservationData }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
