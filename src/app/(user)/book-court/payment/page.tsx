"use client";
import React, { Fragment } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  Box,
  Link,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import { ColorlibStepIcon } from "@/components/styles/StepperStyles";
import { formatVND } from "@/utils/currency";

const steps = ["Đặt lịch", "Thanh toán", "Kết quả"];

const BookCourtDateTimePage = () => {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const reservation_id = searchParams.get("apptransid")?.split("_")[1];
  const reservation_status = Number(searchParams.get("status"));

  return (
    <Fragment>
      <Stepper
        activeStep={3}
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
          const stepProps: { completed?: boolean } = {
            completed: Boolean(reservation_status),
          };
          const labelProps: {
            optional?: React.ReactNode;
            error?: boolean;
          } = {};
          if (!reservation_status && index === 2) {
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

      <Box
        sx={{
          width: "100%",
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
            borderRadius: 4,
            padding: 3,
            maxWidth: "420px",
            width: "100%",
            textAlign: "center",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            "& > * + *": {
              marginTop: "30px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {reservation_status ? (
              <CheckCircle
                sx={{
                  color: "green",
                  marginBottom: "10px",
                  fontSize: "40px",
                }}
              />
            ) : (
              <Cancel
                sx={{
                  color: "red",
                  marginBottom: "10px",
                  fontSize: "40px",
                }}
              />
            )}
            <Typography variant="h5">
              {reservation_status
                ? "Thanh toán thành công"
                : "Thanh toán thất bại"}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              // padding: "15px",
              // border: "2px solid #DBDBDB",
              // borderRadius: "10px",
              "& > * + *": {
                marginTop: "15px",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ flex: 1, textAlign: "left", color: "gray" }}>
                Mã hóa đơn
              </Typography>
              <Typography sx={{ flex: 2, textAlign: "right" }}>
                {reservation_id}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ flex: 1, textAlign: "left", color: "gray" }}>
                Số tiền
              </Typography>
              <Typography sx={{ flex: 2, textAlign: "right" }}>
                {amount && formatVND(Number(amount))}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Button
              variant="outlined"
              sx={{
                borderColor: "var(--buttonColor)",
              }}
            >
              <Link
                sx={{
                  width: "100%",
                  height: "100%",
                  textDecoration: "none",
                  ":hover": {
                    color: "var(--buttonColor)",
                  },
                  fontSize: "20px",
                }}
                href={"/"}
              >
                Trở về trang chủ
              </Link>
            </Button>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default BookCourtDateTimePage;
