"use client";
import { Box, Button, Divider, Typography } from "@mui/material";
import React, { use } from "react";
import Section from "./ProfileSection";
import dayjs from "dayjs";
import { fetchGET } from "@/data/user/fetchGET";
import { Court } from "@/models/court";
import { useParams, useRouter } from "next/navigation";

interface BookingSectionProps {
  id: string;
  checkInTime: Date;
  checkOutTime: Date;
  courtId: string;
  reservationDate: Date;
}
const BookingSectionComponent = async ({
  id,
  checkInTime,
  checkOutTime,
  courtId,
  reservationDate,
}: BookingSectionProps) => {
  const paramId = useParams();
  const router = useRouter();
  const courtInfo: Court = await fetchGET({
    url: `http://localhost:8080/api/v1/courts/${courtId}`,
  });

  function getDay(date: Date) {
    // Parse the date with dayjs
    const parsedDate = dayjs(date, "MM/DD/YY");
    // Get day of the week as full name (e.g., "Monday")
    const dayOfWeekName = parsedDate.format("dddd");
    return dayOfWeekName;
  }
  function handleButtonClick() {
    router.push(`/user/${paramId}/booking`);
  }
  return (
    <Section
      sectionHeader={"My Bookings"}
      sectionButton={"See all"}
      handleButtonClick={handleButtonClick}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          padding: "1rem",
          border: "1px solid rgb(235 238 253 )",
          borderRadius: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Typography>{getDay(reservationDate)}</Typography>
          <Typography
            sx={{
              color: "rgb(67 97 238)",
              fontWeight: "700",
              fontSize: "2.5rem",
            }}
          >
            {dayjs(reservationDate).format("DD")}
          </Typography>
          <Typography>{dayjs(reservationDate).format("MMM")}</Typography>
        </Box>
        <Box>
          <Divider orientation="vertical"></Divider>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                fontSize: "0.7rem", // For 'typography-caption', using a small text style
                border: "0.5px solid transparent", // For 'border-0.5', 'border-solid', and 'border-transparent'
                borderRadius: "4px", // For 'rounded'
                padding: "0.15rem",
                fontWeight: "bold", // For 'font-bold'
                textTransform: "uppercase", // For 'uppercase'
                backgroundColor: "gray", // 'bg-primary-50' can be mapped to MUI's theme color shades
                color: "text.secondary", // 'text-blue-grey-900' mapped to MUI's theme text color
              }}
            >
              Futsal
            </Button>
            <Button
              variant="outlined"
              sx={{
                typography: "caption", // For 'typography-micro', using a small text style
                border: "0.5px solid", // 'border-0.5' and 'border-solid'
                borderColor: "destructive.main", // 'border-destructive-600'
                borderRadius: "4px", // 'rounded'
                paddingX: "4px", // 'px-1' translates to 4px horizontal padding
                paddingY: "2px", // 'py-0.5' translates to 2px vertical padding
                fontWeight: "bold", // 'font-bold'
                textTransform: "uppercase", // 'uppercase'
                backgroundColor: "red", // 'bg-destructive-600'
                color: "white",
              }}
            >
              Pending
            </Button>
          </Box>
          <Box sx={{ marginBottom: "0.2rem" }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "700",
              }}
            >
              {courtInfo.courtName}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <Typography variant="body2">
              On {dayjs(checkInTime).format("DD/MM/YYYY")}
            </Typography>
            <Typography variant="body2">
              {`At ${dayjs(checkInTime).format("HH:MMA")}
              -
              ${dayjs(checkOutTime).format("HH:MMA")} `}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Section>
  );
};

export default BookingSectionComponent;
