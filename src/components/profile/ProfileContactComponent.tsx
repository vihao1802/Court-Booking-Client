"use client";
import React from "react";
import Section from "./ProfileSection";
import { Box, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { PhoneIphone, Edit, Email, LocationOn } from "@mui/icons-material";
import { User } from "@/models/user";
import { useAuthenticatedUser } from "@/hooks/auth/useAuthenticatedUser";

const ProfileContactComponent = async () => {
  const idParam = useParams();
  const router = useRouter();
  const { user, error, mutate, logout } = useAuthenticatedUser();
  function handleButtonClick() {
    router.push(`/user/${idParam}/edit`);
  }
  return (
    <Section
      sectionHeader={"Contacts"}
      sectionButton={"Edit"}
      handleButtonClick={handleButtonClick}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              color: "gray",
            }}
          >
            EMAIL
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "0.5rem",
            }}
          >
            <Email />
            <Typography>{user?.email}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              color: "gray",
            }}
          >
            PHONE
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "0.5rem",
            }}
          >
            <PhoneIphone />
            <Typography>{user?.phoneNumber}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              color: "gray",
            }}
          >
            LOCATION
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "0.5rem",
            }}
          >
            <LocationOn />
            <Typography>{user?.location}</Typography>
          </Box>
        </Box>
      </Box>
    </Section>
  );
};

export default ProfileContactComponent;
