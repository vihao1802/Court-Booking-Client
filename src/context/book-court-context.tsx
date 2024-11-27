import { createContext } from "react";

export const BookCourtContext = createContext({
  date: "",
  setDate: (date: string) => {},
  startTime: "",
  setStartTime: (startTime: string) => {},
  duration: "",
  setDuration: (duration: string) => {},
  totalPrice: 0,
  setTotalPrice: (totalPrice: number) => {},
});
