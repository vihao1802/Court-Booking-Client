"use client";
import React from "react";
import { Box } from "@mui/material";
import BookingDetails from "@/components/book-court/date-time/BookingDetails";
import StepperPayment from "@/components/book-court/payment/StepperPayment";

const BookCourtDateTimePage = () => {
  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <StepperPayment activeCurrStep={0} />
      <BookingDetails />
    </Box>
  );
};

export default BookCourtDateTimePage;
