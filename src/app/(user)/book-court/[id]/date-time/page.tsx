"use client";
import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { Box, StepLabel } from "@mui/material";
import BookingDetails from "@/components/book-court/date-time/BookingDetails";
import { ColorlibStepIcon } from "@/components/styles/StepperStyles";
import StepperPayment from "@/components/book-court/payment/StepperPayment";

const steps = ["Đặt lịch", "Thanh toán", "Hoàn tất"];

const BookCourtDateTimePage = () => {
  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <StepperPayment activeCurrStep={0} />
      {/* <Stepper
        activeStep={0}
        sx={{
          "& .Mui-active": {
            "& .MuiStepIcon-root": {
              color: "var(--buttonColor)",
            },
            "& .MuiStepConnector-line": {
              color: "var(--buttonColor)",
            },
          },
          "& .Mui-completed": {
            "& .MuiStepIcon-root": {
              color: "var(--buttonColor)",
            },
            "& .MuiStepConnector-line": {
              borderColor: "var(--buttonColor)",
            },
          },
          marginBottom: "20px",
        }}
      >
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          return (
            <Step
              key={label}
              {...stepProps}
              sx={{
                padding: "5px",
              }}
            >
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper> */}

      <BookingDetails />
    </Box>
  );
};

export default BookCourtDateTimePage;
