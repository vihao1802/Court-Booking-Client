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
        alignItems: "center",
        // border: "1px solid rgb(235 238 253)",
        // borderRadius: "8px",
        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
        padding: "1rem",
      }}
    >
      {/* <Box
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
          <Typography>{reservation.reservationDate.split("-")[0]}</Typography>
          <Typography
            sx={{
              color: "var(--buttonColor)",
              fontWeight: "700",
              fontSize: "2.5rem",
            }}
          >
            {reservation.reservationDate.split("-")[2]}
          </Typography>
          <Typography>{reservation.reservationDate.split("-")[1]}</Typography>
        </Box>
        <Divider
          sx={{ display: "flex", justifyContent: "center" }}
          orientation="vertical"
          flexItem
        ></Divider>
      </Box> */}

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
              ? "Đang chờ"
              : reservation.reservationState === 1
              ? "Đã xác nhận"
              : "Đã hủy"}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ fontWeight: "700" }}>
          {reservation.court.courtName}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "0.5rem",
            color: "rgb(109 105 123)",
          }}
        >
          <Typography>{reservation.reservationDate}</Typography>
          <Typography>
            {reservation.checkInTime}:00 - {reservation.checkOutTime}:00
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          height: "100%",
          flex: "3",
          display: "flex",
          gap: "0.5rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            justifyContent: "end",
            flex: "1",
          }}
        >
          <Link
            href={`/booking/${reservation.id}`}
            sx={{
              color: "var(--buttonColor)",
            }}
          >
            Chi tiết
            <ArrowForward
              sx={{
                color: "var(--buttonColor)",
                fontSize: "1rem",
              }}
            />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default BookingComponent;
