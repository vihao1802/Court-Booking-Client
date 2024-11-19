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
import { formatVND } from "@/utils/format";
import { reservationApi } from "@/api/reservation";
import OvalLoader from "@/components/shared/OvalLoader";
import useSWR from "swr";
import { useGetReservationById } from "@/hooks/reservation/useGetReservationById";
import StepperPayment from "@/components/book-court/payment/StepperPayment";

const steps = ["Đặt lịch", "Thanh toán", "Kết quả"];

const BookCourtPaymentStatusPage = () => {
  const searchParams = useSearchParams();
  const { id } = useParams<{ id: string }>();
  const reservation_status = Number(searchParams.get("status"));
  const {
    data: reservation,
    error,
    isLoading,
  } = useGetReservationById({
    reservationId: id,
  });

  console.log(reservation);

  if (error) {
    // router.push(`/`);
    console.log(error);
  }

  if (isLoading) {
    return <OvalLoader size="50" />;
  }

  console.log(reservation_status);

  return (
    <Fragment>
      <StepperPayment
        activeCurrStep={3}
        isCompleted={reservation_status === 1}
        enableError={true}
      />
      {/* <Stepper
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
            completed: Boolean(reservation_status === 1),
          };
          const labelProps: {
            optional?: React.ReactNode;
            error?: boolean;
          } = {};
          if (!(reservation_status === 1) && index === 2) {
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
      </Stepper> */}

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
            {reservation_status === 1 ? (
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
              {reservation_status === 1
                ? "Thanh toán thành công"
                : "Thanh toán thất bại"}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
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
                {reservation.id.split("-")[0]}...{" "}
                {
                  reservation.id.split("-")[
                    reservation.id.split("-").length - 1
                  ]
                }
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
                Tổng tiền
              </Typography>
              <Typography sx={{ flex: 2, textAlign: "right" }}>
                {reservation.totalPrice &&
                  formatVND(Number(reservation.totalPrice))}
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
                Ngày đến sân
              </Typography>
              <Typography sx={{ flex: 2, textAlign: "right" }}>
                {reservation.reservationDate}
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
                Thời gian vào
              </Typography>
              <Typography sx={{ flex: 2, textAlign: "right" }}>
                {reservation.checkInTime}:00
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
                Thời gian ra
              </Typography>
              <Typography sx={{ flex: 2, textAlign: "right" }}>
                {reservation.checkOutTime}:00
              </Typography>
            </Box>
          </Box>
          <Box>
            <Button
              variant="outlined"
              sx={{
                border: "none",
              }}
            >
              <Link
                sx={{
                  width: "100%",
                  height: "100%",
                  textDecoration: "none",
                  color: "var(--buttonColor)",
                  ":hover": {
                    color: "var(--buttonHoverColor)",
                  },
                  fontSize: "18px",
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

export default BookCourtPaymentStatusPage;
