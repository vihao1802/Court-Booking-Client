"use client";
import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { StepLabel, Typography } from "@mui/material";
import { ColorlibStepIcon } from "@/components/styles/StepperStyles";

const steps = ["Đặt lịch", "Thanh toán", "Hoàn tất"];

interface StepperPaymentProps {
  activeCurrStep: number;
  isCompleted?: boolean;
  enableError?: boolean;
}

const StepperPayment = ({
  activeCurrStep,
  isCompleted = true,
  enableError = false,
}: StepperPaymentProps) => {
  return (
    <Stepper
      activeStep={activeCurrStep}
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
        let stepProps: { completed?: boolean } = {};

        if (enableError) {
          stepProps.completed = true;
        }

        const labelProps: {
          optional?: React.ReactNode;
          error?: boolean;
        } = {};

        if (!isCompleted && index === 2) {
          labelProps.optional = (
            <Typography variant="caption" color="error">
              Thất bại
            </Typography>
          );
          labelProps.error = true;
        }

        return (
          <Step
            key={label}
            {...stepProps}
            sx={{
              padding: "5px",
            }}
          >
            <StepLabel StepIconComponent={ColorlibStepIcon} {...labelProps}>
              {label}
            </StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default StepperPayment;
