"use client";
import { Box, Button, Divider, Link, Typography } from "@mui/material";
import { Tune, ArrowForward } from "@mui/icons-material";
import React, { useEffect } from "react";
import { useGetMyReservation } from "@/hooks/reservation/useGetMyReservation";
import { getDay } from "@/utils/format";
import dayjs from "dayjs";
import { ReservationProvider } from "@/context/reservation-context";
import BookingComponent from "@/components/profile/Booking/BookingComponent";
import MonthDivider from "@/components/profile/Booking/MonthDivider";
import TimeFilterButton from "@/components/profile/Booking/TimeFilterButton";

const MyBooking = () => {
  const { data } = useGetMyReservation({
    enabled: true,
  });

  const [dataFilter, setDataFilter] = React.useState(data);
  const [isActive, setIsActive] = React.useState(0); // 0: all, 1: upcoming, 2: past

  useEffect(() => {
    setDataFilter(data);
  }, [data]);

  const handleUpcomingButton = () => {
    if (isActive === 1) {
      setIsActive(0);
      setDataFilter(data);
      return;
    }

    setDataFilter(
      data.filter((item) => dayjs(item.checkInTime).isAfter(dayjs()))
    );
    setIsActive(1);
  };
  const handlePastButton = () => {
    if (isActive === 2) {
      setIsActive(0);
      setDataFilter(data);
      return;
    }
    setDataFilter(
      data.filter((item) => dayjs(item.checkInTime).isBefore(dayjs()))
    );
    setIsActive(2);
  };
  return (
    <ReservationProvider>
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          padding: "1rem",
          backgroundColor: "white",
          borderRadius: "8px",
        }}
      >
        {/* header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "1rem  ",
            marginBottom: "1rem",
          }}
        >
          <TimeFilterButton
            isActive={isActive === 1}
            handleButtonClick={() => handleUpcomingButton()}
          >
            Lịch đặt sắp tới
          </TimeFilterButton>
          <TimeFilterButton
            isActive={isActive === 2}
            handleButtonClick={() => handlePastButton()}
          >
            Lịch đặt trong quá khứ
          </TimeFilterButton>
        </Box>
        {/* body */}
        <Box
          sx={{
            width: "100%",
          }}
        >
          {/* body-header */}
          <Box
            sx={{
              height: "3rem",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "gray",
              }}
            >
              {dataFilter ? dataFilter.length : 0} lịch đặt
            </Typography>
            <Button
              startIcon={<Tune />}
              sx={{ backgroundColor: "var(--buttonColor)", color: "white" }}
            >
              Filter
            </Button>
          </Box>
          {/* body-body */}
          <Box>
            {dataFilter &&
              dataFilter.map((item) => (
                <Box key={item.id}>
                  {/* <MonthDivider date={dayjs(item.createdAt)} /> */}
                  <BookingComponent reservation={item} />
                </Box>
              ))}
          </Box>
        </Box>
      </Box>
    </ReservationProvider>
  );
};

export default MyBooking;
