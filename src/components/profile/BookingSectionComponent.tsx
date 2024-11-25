"use client";
import { Box, Button, Divider, Typography } from "@mui/material";
import React, { use } from "react";
import Section from "./ProfileSection";
import dayjs from "dayjs";
import { Court } from "@/models/court";
import { useParams, useRouter } from "next/navigation";
import { useGetCourtById } from "@/hooks/court/useGetCourtById";
import { getDay } from "@/utils/format";
import { useGetReservationById } from "@/hooks/reservation/useGetReservationById";
import OvalLoader from "../shared/OvalLoader";
import { ReservationState } from "@/types/enums";

interface BookingSectionProps {
  id: string;
}
const BookingSectionComponent = async ({ id }: BookingSectionProps) => {
  const paramId = useParams();
  const router = useRouter();
  const { data: reservation, isLoading } = useGetReservationById({
    reservationId: id,
  });
  function handleButtonClick() {
    router.push(`/user/${paramId}/booking`);
  }

  if (isLoading || !reservation) {
    return <OvalLoader />;
  }

  return (
    <Section
      sectionHeader={"Lịch đặt gần đây"}
      sectionButton={"Tất cả"}
      handleButtonClick={handleButtonClick}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: {
            sm: "column",
            md: "row",
          },
          gap: "1rem",
          borderRadius: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              sm: "row",
              md: "column",
            },
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
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
        <Box>
          <Divider orientation="vertical"></Divider>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "0.5rem",
              marginBottom: "1rem",
              justifyContent: "space-between",
            }}
          >
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
            <Typography
              sx={{
                color:
                  reservation.reservationState === ReservationState.SUCCESS
                    ? "var(--buttonColor)"
                    : reservation.reservationState === ReservationState.PENDING
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
          </Box>
          <Box sx={{ marginBottom: "0.2rem" }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "700",
              }}
            >
              {reservation.court.courtName}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              color: "rgb(109 105 123)",
            }}
          >
            <Typography variant="body2">
              {reservation.reservationDate}
            </Typography>
            <Typography variant="body2">
              {reservation.checkInTime}:00 - {reservation.checkOutTime}:00
            </Typography>
          </Box>
        </Box>
      </Box>
    </Section>
  );
};

export default BookingSectionComponent;
