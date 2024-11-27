"use client";
import React, { useEffect, useState } from "react";
import { Divider, Box } from "@mui/material";
import ProfileWall from "@/components/profile/ProfileWall";
import BookingInfoComponent from "@/components/profile/BookingInfoComponent";
import BookingSectionComponent from "@/components/profile/BookingSectionComponent";
import ProfileContactComponent from "@/components/profile/ProfileContactComponent";
import { useRouter, useParams } from "next/navigation";
import { useGetMyReservation } from "@/hooks/reservation/useGetMyReservation";
import { Reservation } from "@/models/reservation";
import dayjs from "dayjs";

function Profile() {
  const [totalHours, setTotalHours] = useState<number>(0);
  const router = useRouter();
  const params = useParams();
  const { data, error } = useGetMyReservation({
    params: {
      page: 0,
      size: 1,
    },
    enabled: false,
  });
  // console.log("data", data);

  function handleProfileWallButton() {
    router.push(`/user/${params}/edit`);
  }

  useEffect(() => {
    if (data === undefined || error) return;
    let totalhours: number = 0;
    data?.forEach((reservation: Reservation) => {
      // Calculate the difference in hours
      const hours = dayjs(reservation.checkOutTime).diff(
        reservation.checkInTime,
        "hour"
      );

      // Add to total hours
      totalhours += hours;
    });
    setTotalHours(totalhours);
  }, [data]);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* top part */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          backgroundColor: "white",
          borderRadius: "8px",
          marginBottom: "1rem",
        }}
      >
        {/* top of top part */}
        <ProfileWall
          handleButtonAvatarClicked={() => handleProfileWallButton()}
        />
        {/* bottom of top part */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "1rem",
            gap: "0.75rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              gap: "1rem",
              width: "100%",
            }}
          >
            <BookingInfoComponent
              title="Tổng số lần đặt sân"
              info={(data?.length ?? 0).toString()}
            />
            <Divider orientation="vertical" variant="middle" flexItem />
            <BookingInfoComponent
              title="Tổng số giờ đã đến sân"
              info={totalHours.toString()}
            />
          </Box>
        </Box>
      </Box>

      {/* bottom part */}
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            sm: "column",
            md: "row",
          },
          justifyContent: "space-evenly",
          gap: "1rem",
          width: "100%",
          maxWidth: "1056px",
          padding: "1rem",
        }}
      >
        {/* Booking */}
        {data && data.length > 0 ? (
          <BookingSectionComponent id={data[0].id} />
        ) : null}
        {/* Contact */}
        <ProfileContactComponent />
      </Box>
    </Box>
  );
}

export default Profile;
