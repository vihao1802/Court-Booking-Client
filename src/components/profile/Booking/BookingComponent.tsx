import { Reservation } from "@/models/reservation";
import { getDay } from "@/utils/format";
import { ArrowForward } from "@mui/icons-material";
import { Box, Divider, Link, Typography } from "@mui/material";
import { Button } from "@mui/joy";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import React from "react";

interface BookingComponentProps {
  reservation: Reservation;
}

const BookingComponent = ({ reservation }: BookingComponentProps) => {
  return (
    <Box
      sx={{
        height: "110px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        border: "1px solid rgb(235 238 253)",
        borderRadius: "8px",
        padding: "1rem",
      }}
    >
      <Box
        sx={{
          height: "100%",
          flex: "1",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.7rem",
            }}
          >
            {getDay(new Date(reservation.checkInTime))}
          </Typography>
          <Typography
            sx={{
              color: "rgb(67 97 238)",
              fontWeight: "700",
              fontSize: "2rem",
            }}
          >
            {dayjs(reservation.checkInTime).format("DD")}
          </Typography>
          <Typography>
            {dayjs(reservation.checkInTime).format("MMM")}
          </Typography>
        </Box>
        <Divider
          sx={{ display: "flex", justifyContent: "center" }}
          orientation="vertical"
          flexItem
        ></Divider>
      </Box>

      <Box
        sx={{
          flex: "3",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "0.5rem",
            marginBottom: "0.5rem",
          }}
        >
          <Typography
            sx={{
              padding: "0.2rem",
              height: "1.5rem",
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
            {reservation.court.courtType.courtTypeName}
          </Typography>
          <Typography
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
              reservation.reservationState === 0
                ? "neutral"
                : reservation.reservationState === 1
                ? "success"
                : "warning"
            }
          >
            {reservation.reservationState === 0
              ? "Chờ xác nhận"
              : reservation.reservationState === 1
              ? "Đã xác nhận"
              : "Đã hủy"}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ fontWeight: "700" }}>
          {reservation.court.courtName}
        </Typography>
      </Box>
      <Box
        sx={{
          height: "100%",
          flex: "3",
          display: "flex",
          flexDirection: "column",
          alignreservations: "flex-start",
          gap: "0.5rem",
        }}
      >
        <Typography variant="body2">21 Oct 2024, Monday</Typography>
        <Typography variant="body2">09:00AM - 11:00AM</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "0.5rem",
            justifyContent: "flex-start",
            alignreservations: "center",
          }}
        >
          <Link href={`/booking/${reservation.id}`}>View detail</Link>
          <ArrowForward
            sx={{
              color: "rgb(67 97 238)",
              fontSize: "1rem",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default BookingComponent;
