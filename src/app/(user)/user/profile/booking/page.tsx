"use client";
import {
  Box,
  Button,
  Divider,
  Link,
  Pagination,
  Typography,
} from "@mui/material";
import { Tune, ArrowForward } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useGetMyReservation } from "@/hooks/reservation/useGetMyReservation";
import { getDay } from "@/utils/format";
import dayjs from "dayjs";
import { ReservationProvider } from "@/context/reservation-context";
import BookingComponent from "@/components/profile/Booking/BookingComponent";
import MonthDivider from "@/components/profile/Booking/MonthDivider";
import TimeFilterButton from "@/components/profile/Booking/TimeFilterButton";
import { PaginationBase as ApiPagination } from "@/models/api";
import { Reservation } from "@/models/reservation";

const MyBooking = () => {
  const [filters, setFilters] = useState<ApiPagination>({
    page: 0,
    size: 8,
  });

  const { data: reservations, isLoading: isLoadingReservations } =
    useGetMyReservation({
      params: filters,
      enabled: false,
    });

  // const [dataFilter, setDataFilter] = React.useState(reservations);
  const [isActive, setIsActive] = React.useState(0); // 0: all, 1: upcoming, 2: past

  const { pageNumber, pageSize } = reservations?.pageable || {};
  const totalPages = reservations?.totalPages;

  /*  useEffect(() => {
    setDataFilter(data);
  }, [data]); */

  const handleUpcomingButton = () => {
    /*  if (isActive === 1) {
      setIsActive(0);
      setDataFilter(data);
      return;
    }

    setDataFilter(
      data.filter((item) => dayjs(item.checkInTime).isAfter(dayjs()))
    );
    setIsActive(1); */
  };
  const handlePastButton = () => {
    /* if (isActive === 2) {
      setIsActive(0);
      setDataFilter(data);
      return;
    }
    setDataFilter(
      data.filter((item) => dayjs(item.checkInTime).isBefore(dayjs()))
    );
    setIsActive(2); */
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    console.log(page);

    setFilters({
      ...filters,
      page: page - 1,
    });
  };

  console.log(pageNumber);

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
              {reservations ? reservations.totalElements : 0} lịch đặt
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
            {reservations &&
              !isLoadingReservations &&
              reservations.content.map((item: Reservation) => (
                <Box key={item.id}>
                  {/* <MonthDivider date={dayjs(item.createdAt)} /> */}
                  <BookingComponent reservation={item} />
                </Box>
              ))}
          </Box>
          {!isLoadingReservations && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Pagination
                count={totalPages}
                page={pageNumber + 1}
                variant="outlined"
                onChange={handlePageChange}
              />
            </Box>
          )}
        </Box>
      </Box>
    </ReservationProvider>
  );
};

export default MyBooking;
