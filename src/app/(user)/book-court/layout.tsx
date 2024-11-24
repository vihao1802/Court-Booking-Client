"use client";
import AuthProvider from "@/components/common/auth";
import { Box } from "@mui/material";
import React, { createContext, useState } from "react";

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

const BookCourtLayout = ({ children }: { children: React.ReactNode }) => {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <BookCourtContext.Provider
      value={{
        date,
        setDate,
        startTime,
        setStartTime,
        duration,
        setDuration,
        totalPrice,
        setTotalPrice,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1056px",
          margin: "auto",
          padding: "20px 5px",
        }}
      >
        <AuthProvider>{children}</AuthProvider>
      </Box>
    </BookCourtContext.Provider>
  );
};

export default BookCourtLayout;
