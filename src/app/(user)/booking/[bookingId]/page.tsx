"use client";
import { Directions, Google, Map } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/joy";
import React, { useContext, useEffect } from "react";
import { useParams } from "next/navigation";
import { useGetReservationById } from "@/hooks/reservation/useGetReservationById";
import { Court } from "@/models/court";
import { Reservation } from "@/models/reservation";
import dayjs from "dayjs";
import { courtApi } from "@/api/court";
import { formatVND } from "@/utils/format";
import { useAuthenticatedUser } from "@/hooks/auth/useAuthenticatedUser";
import { UserContext } from "@/context/user-context";

const BookingDetail = () => {
  const { bookingId } = useParams();
  const { swrResponse } = useGetReservationById({
    reservationId: bookingId as string,
  });
  const context = useContext(UserContext);
  const [reservation, setReservation] = React.useState<Reservation | null>(
    null
  );

  useEffect(() => {
    if (swrResponse.data) {
      setReservation(swrResponse.data);
    }
  }, [swrResponse.data]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          borderRadius: "16px",
        }}
      >
        <Card
          variant="outlined"
          sx={{
            borderRadius: "16px",
            backgroundColor: "white",
            padding: "28px 16px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            margin: "16px",
            marginBottom: "8px",

            "@media (min-width: 1024px)": {
              margin: 0,
            },
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: ".5rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Typography
                variant="subtitle1"
                color="rgb(72 68 90)"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Mã đơn đặt: &nbsp;&nbsp;
              </Typography>

              <Typography variant="subtitle1" color="textSecondary">
                {bookingId}
              </Typography>
            </Box>
            <Divider sx={{ marginY: 2 }} />

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Typography
                variant="button"
                sx={{
                  padding: "0.4rem",
                  height: "1.7rem",
                  fontSize: "0.5rem",
                  border: "0.5px solid", // 'border-0.5' and 'border-solid'
                  borderColor: "destructive.main", // 'border-destructive-600'
                  borderRadius: "4px", // 'rounded'
                  fontWeight: "bold", // 'font-bold'
                  textTransform: "uppercase", // 'uppercase'
                  backgroundColor: "#1976d2", // 'bg-destructive-600'
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {reservation?.court.courtType.courtTypeName.toUpperCase()}
              </Typography>
              <Typography
                variant="button"
                sx={{
                  padding: "0.2rem",
                  height: "1.5rem",
                  fontSize: "0.6rem",
                  border: "0.5px solid", // 'border-0.5' and 'border-solid'
                  borderColor: "destructive.main", // 'border-destructive-600'
                  borderRadius: "4px", // 'rounded'
                  paddingX: "4px", // 'px-1' translates to 4px horizontal padding
                  paddingY: "2px", // 'py-0.5' translates to 2px vertical padding
                  fontWeight: "bold", // 'font-bold'
                  textTransform: "uppercase", // 'uppercase'
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                color={
                  reservation?.reservationState === 0
                    ? "neutral"
                    : reservation?.reservationState === 1
                    ? "success"
                    : "warning"
                }
              >
                {reservation?.reservationState === 0
                  ? "Chờ xác nhận"
                  : reservation?.reservationState === 1
                  ? "Đã xác nhận"
                  : "Đã hủy"}
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight="bold" sx={{ marginY: 1 }}>
              {reservation?.court.courtName}
            </Typography>
            <Typography variant="body1" sx={{ marginY: 1 }}>
              {dayjs(reservation?.checkInTime).format("DD MMM YYYY, dddd")}
              <br />
              {dayjs(reservation?.checkInTime).format("HH:mmA ")} -
              {dayjs(reservation?.checkOutTime).format(" HH:mmA")}
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <Box sx={{ padding: 3, maxWidth: 600, margin: "auto" }}>
            {/* Invoice Details */}
            <Card variant="outlined" sx={{ marginBottom: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Thông tin thanh toán
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {dayjs(reservation?.checkInTime).format("DD MMM YYYY, dddd")}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {dayjs(reservation?.checkInTime).format("HH:mmA ")} -
                  {dayjs(reservation?.checkOutTime).format(" HH:mmA")}
                </Typography>
                <Box
                  sx={{
                    marginTop: "1rem",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body1" fontWeight="normal">
                      Giá sân
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      sx={{ textAlign: "right" }}
                    >
                      {reservation &&
                        formatVND(reservation?.court.rentalPricePerHour)}
                      /giờ
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body1" fontWeight="normal">
                      Số giờ thuê
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      sx={{ textAlign: "right" }}
                    >
                      {reservation &&
                        dayjs(
                          reservation?.checkOutTime,
                          "MM/DD/YY, h:mm A"
                        ).diff(
                          dayjs(reservation.checkInTime, "MM/DD/YY, h:mm A"),
                          "hour",
                          true
                        )}{" "}
                      giờ
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
              <Divider />
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ textAlign: "right" }}
                >
                  Tổng cộng
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color="primary"
                  sx={{ textAlign: "right" }}
                >
                  {reservation && formatVND(reservation?.totalPrice)}
                </Typography>
              </CardContent>
            </Card>

            {/* Contact Details */}
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Thông tin người đặt
                </Typography>
                <Divider sx={{ marginY: 2 }} />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography color="textSecondary">Tên người đặt</Typography>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      {context && context.userData.userName}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography color="textSecondary">Email</Typography>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      {context && context.userData.email}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography color="textSecondary">Số điện thoại</Typography>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      {context && context.userData.phoneNumber}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography color="textSecondary">Địa chỉ</Typography>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      {context && context.userData.location}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Card>
      </Box>

      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "1rem 2rem",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            marginBottom: "16px",
          }}
          gutterBottom
        >
          Địa chỉ sân thể thao
        </Typography>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="body1" fontWeight="bold">
              {reservation?.court.courtName}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {reservation?.court.courtAddress}
            </Typography>
            <Divider sx={{ marginY: 2 }} />
            <Grid container spacing={2}>
              <Grid xs={4}>
                {reservation && (
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(
                      reservation?.court.courtAddress
                    )}&key=${process.env.NEXT_PUBLIC_MAP_API_KEY}`}
                    width="600"
                    height="450"
                    loading="lazy"
                  ></iframe>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default BookingDetail;
