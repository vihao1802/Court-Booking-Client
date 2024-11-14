"use client";
import React, { Suspense } from "react";
import { Divider, Box } from "@mui/material";
import dayjs from "dayjs";
import ProfileWall from "@/components/profile/ProfileWall";
import Section from "@/components/profile/ProfileSection";
import { User } from "@/models/user";
import { IError } from "@/models/error";
import BookingInfoComponent from "@/components/profile/BookingInfoComponent";
import { fetchGET } from "@/data/user/fetchGET";
import { IReservation } from "@/models/reservation";
import BookingSectionComponent from "@/components/profile/BookingSectionComponent";
import ProfileContactComponent from "@/components/profile/ProfileContactComponent";
import { useRouter, useParams } from "next/navigation";

const Profile = async () => {
  const router = useRouter();
  const params = useParams();
  const myReservations: IReservation[] = await fetchGET({
    url: "http://localhost:8080/api/v1/reservations/my-reservations",
  });
  const totalBookingHours = calculateBookingHours();
  function handleProfileWallButton() {
    router.push(`/user/${params}/edit`);
  }

  function calculateBookingHours() {
    let totalhours: number = 0;
    myReservations.forEach((reservation) => {
      // Parse check-in and check-out times with dayjs
      const checkIn = dayjs(reservation.checkInTime, "MM/DD/YY, h:mm A");
      const checkOut = dayjs(reservation.checkOutTime, "MM/DD/YY, h:mm A");

      // Calculate the difference in hours
      const hours = checkOut.diff(checkIn, "hour", true); // 'true' returns a float

      // Add to total hours
      totalhours += hours;
    });

    return totalhours;
  }
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
        <Suspense fallback={<p>Loading...</p>}>
          <ProfileWall
            handleButtonAvatarClicked={() => handleProfileWallButton()}
          />
        </Suspense>
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
              gap: "1rem",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: "100%",
            }}
          >
            <BookingInfoComponent
              title="Booking made"
              info={myReservations.length.toString()}
            />
            <Divider orientation="vertical" variant="middle" flexItem />
            <BookingInfoComponent
              title="Booking hours"
              info={totalBookingHours.toString()}
            />
          </Box>
        </Box>
      </Box>

      {/* bottom part */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          gap: "1rem",
          width: "100%",
          maxWidth: "1056px",
          padding: "1rem",
        }}
      >
        {/* Booking */}
        <Suspense fallback={<p>Loading...</p>}>
          <BookingSectionComponent
            id={myReservations[0].id}
            checkInTime={myReservations[0].checkInTime}
            checkOutTime={myReservations[0].checkOutTime}
            courtId={myReservations[0].courtId}
            reservationDate={myReservations[0].reservationDate}
          />
        </Suspense>
        {/* Contact */}
        <Suspense fallback={<p>Loading...</p>}>
          <ProfileContactComponent />
        </Suspense>
      </Box>
    </Box>
  );
};

export default Profile;
