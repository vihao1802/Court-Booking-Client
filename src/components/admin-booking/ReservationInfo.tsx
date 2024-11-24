import React from "react";
import Avatar from "@mui/joy/Avatar";
import Chip from "@mui/joy/Chip";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import dayjs from "dayjs";
import { Reservation } from "@/models/reservation";
import { formatVND } from "@/utils/format";
import { ReservationState } from "@/types/enums";

export default function ReservationInfo({
  reservation,
}: {
  reservation: Partial<Reservation>;
}) {
  return (
    <Card sx={{ width: 320, maxWidth: "100%", boxShadow: "lg" }}>
      <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
        <Avatar
          src={reservation.user?.profileImage}
          sx={{ "--Avatar-size": "4rem" }}
        />
        <Chip
          size="sm"
          variant="soft"
          color={
            reservation.reservationState === 0
              ? "warning"
              : reservation.reservationState === 1
              ? "success"
              : "danger"
          }
          sx={{
            mt: -1,
            mb: 1,
            border: "3px solid",
            borderColor: "background.surface",
          }}
        >
          {reservation.reservationState !== undefined
            ? ReservationState[reservation.reservationState]
            : "Unknown"}
        </Chip>
        <Typography level="title-lg">{reservation.user?.userName}</Typography>
        <Box
          sx={{
            alignItems: "left",
            textAlign: "left",
          }}
        >
          <Typography level="body-sm" sx={{ maxWidth: "50ch" }}>
            Số điện thoại: {reservation.user?.phoneNumber}
          </Typography>
          <Typography level="body-sm" sx={{ maxWidth: "50ch" }}>
            Thời gian tạo đơn:{" "}
            {dayjs(reservation.createdAt).format("DD/MM/YYYY HH:mm")}
          </Typography>
          <Typography level="body-sm" sx={{ maxWidth: "50ch" }}>
            Ngày đặt sân:{" "}
            {dayjs(reservation.reservationDate).format("DD/MM/YYYY")}
          </Typography>
          <Typography level="body-sm" sx={{ maxWidth: "50ch" }}>
            Thời gian sử dụng:{" "}
            {dayjs(reservation.checkInTime, "H").format("HH:mm")} -{" "}
            {dayjs(reservation.checkOutTime, "H").format("HH:mm")}
          </Typography>
          <Typography level="body-sm" sx={{ maxWidth: "50ch" }}>
            Sân: {reservation.court?.courtName}
          </Typography>
          <Typography level="body-sm" sx={{ maxWidth: "50ch" }}>
            Loại sân: {reservation.court?.courtType.courtTypeName}
          </Typography>
          <Typography level="body-sm" sx={{ maxWidth: "50ch" }}>
            Phương thức thanh toán: {reservation.paymentMethod}
          </Typography>
          <Typography level="body-sm" sx={{ maxWidth: "50ch" }}>
            Tổng cộng: {formatVND(Number(reservation.totalPrice))}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
