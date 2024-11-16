"use client";
import React, { Fragment } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { StepLabel } from "@mui/material";
import { ColorlibStepIcon } from "@/components/styles/StepperStyles";
import PaymentDetail from "@/components/book-court/payment/PaymentDetail";

const steps = ["Đặt lịch", "Thanh toán", "Hoàn tất"];

const BookCourtPaymentPage = () => {
  return (
    <Fragment>
      <Stepper
        activeStep={2}
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
          marginBottom: "40px",
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
      </Stepper>
      <PaymentDetail />
    </Fragment>
  );
};

export default BookCourtPaymentPage;
