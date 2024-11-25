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
import { Button, ButtonGroup, CardActions, CardOverflow } from "@mui/joy";
import { reservationApi } from "@/api/reservation";
import toast from "react-hot-toast";

export default function ReservationInfo({
  reservation,
}: {
  reservation: Partial<Reservation>;
}) {
  const handleClick = async () => {
    try {
      if (reservation.id) {
        const response = await reservationApi.getInvoice(reservation.id);
        // Tạo một Blob từ dữ liệu trả về
        const blob = new Blob([response], { type: "application/pdf" });

        // Tạo URL từ Blob
        const url = URL.createObjectURL(blob);

        // Tạo thẻ <a> để tải file hoặc mở file trong tab mới
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank"; // Mở trong tab mới
        link.download = "invoice.pdf"; // Tên file khi tải về
        link.click();

        // Giải phóng URL sau khi sử dụng
        URL.revokeObjectURL(url);
      } else {
        toast.error("Reservation ID is undefined");
      }
    } catch (error) {
      console.error("Failed to fetch PDF:", error);
    }
  };
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
      {reservation.reservationState === 1 && (
        <CardOverflow sx={{ bgcolor: "background.level1" }}>
          <CardActions buttonFlex="1">
            <ButtonGroup
              variant="outlined"
              sx={{ bgcolor: "background.surface" }}
            >
              <Button color="success" onClick={handleClick}>
                In hóa đơn
              </Button>
            </ButtonGroup>
          </CardActions>
        </CardOverflow>
      )}
    </Card>
  );
}
