"use client";
import { Directions, Google, Map } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Divider,
  Link,
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
import OvalLoader from "@/components/shared/OvalLoader";
import { ReservationState } from "@/types/enums";

const BookingDetail = () => {
  const { bookingId } = useParams();
  const { data: reservation } = useGetReservationById({
    reservationId: bookingId as string,
  });

  if (!reservation) return <OvalLoader />;

  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 2 }}>
        <Link underline="hover" color="inherit" href="/user/profile">
          Thông tin cá nhân
        </Link>
        <Link underline="hover" color="inherit" href="/user/profile/booking">
          Lịch đặt sân
        </Link>
        <Typography sx={{ color: "text.primary" }}>Chi tiết đơn đặt</Typography>
      </Breadcrumbs>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            lg: "row",
          },
          gap: "1rem",
        }}
      >
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
              padding: 3,
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              // margin: "16px",
              // marginBottom: "8px",

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
                padding: 0,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    md: "column",
                    lg: "row",
                  },
                  justifyContent: "flex-start",
                  alignItems: {
                    md: "start",
                    lg: "center",
                  },
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
              <Typography
                sx={{
                  color:
                    reservation.reservationState === ReservationState.SUCCESS
                      ? "var(--buttonColor)"
                      : reservation.reservationState ===
                        ReservationState.PENDING
                      ? "GrayText"
                      : "red",
                }}
              >
                {reservation.reservationState === ReservationState.PENDING
                  ? "Đang chờ"
                  : reservation.reservationState === ReservationState.SUCCESS
                  ? "Đã xác nhận"
                  : "Đã hủy"}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  {reservation.court.courtName}
                </Typography>
                <Typography
                  sx={{
                    backgroundColor: "var(--buttonLightColor)",
                    color: "var(--buttonColor)",
                    borderRadius: "15px",
                    padding: "2px 10px",
                  }}
                >
                  {reservation.court.courtType.courtTypeName}
                </Typography>
              </Box>
              <Typography color="textSecondary">
                {dayjs(reservation.reservationDate).format("DD MMM YYYY, dddd")}
                <br />
                {reservation.checkInTime}:00 - {reservation.checkOutTime}:00
              </Typography>
            </CardContent>
          </Card>

          {/* Invoice Details */}
          <Card sx={{ border: "none", padding: 3, boxShadow: "none" }}>
            <CardContent sx={{ padding: 0 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Thông tin thanh toán
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
                  <Typography
                    variant="body1"
                    fontWeight="normal"
                    color="textSecondary"
                  >
                    Giá sân
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    sx={{ textAlign: "right" }}
                  >
                    {reservation &&
                      formatVND(reservation?.court.rentalPricePerHour)}
                    / tiếng
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
                  <Typography
                    variant="body1"
                    fontWeight="normal"
                    color="textSecondary"
                  >
                    Số giờ thuê
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    sx={{ textAlign: "right" }}
                  >
                    {Number(reservation.checkOutTime) -
                      Number(reservation.checkInTime)}{" "}
                    tiếng
                  </Typography>
                </Box>
              </Box>
            </CardContent>
            <Divider
              sx={{
                marginY: 2,
              }}
            />
            <CardContent
              sx={{
                padding: 0,
              }}
            >
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
                sx={{
                  textAlign: "right",
                  color: "var(--buttonColor)",
                  ...(reservation.reservationState ===
                    ReservationState.FAILED && {
                    textDecoration: "line-through",
                    color: "GrayText",
                  }),
                }}
              >
                {formatVND(reservation.totalPrice)}
              </Typography>
            </CardContent>
          </Card>

          {/* Contact Details */}
          <Card sx={{ padding: 3, border: "none", boxShadow: "none" }}>
            <CardContent sx={{ padding: 0 }}>
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
                    {reservation.user.userName}
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
                    {reservation.user.email}
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
                    {reservation.user.phoneNumber}
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
                    {reservation.user.location}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: 3,
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
                      height="600"
                      loading="lazy"
                    ></iframe>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default BookingDetail;
