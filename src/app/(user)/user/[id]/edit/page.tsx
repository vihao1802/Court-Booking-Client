"use client";
import ProfileWall from "@/components/profile/ProfileWall";
import Section from "@/components/profile/ProfileSection";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import React, { Suspense } from "react";
import ProfileTextField from "@/components/profile/ProfileTextField";
import ProfileAutocomplete from "@/components/profile/ProfileAutocomplete";
import { fetchGET } from "@/data/user/fetchGET";
import { useParams } from "next/navigation";

const EditProfile = () => {
  // const userData = await fetchGET(`http://localhost:8080/api/v1/users/my-info`)
  const gender = [
    {
      id: "1",
      label: "Male",
    },
    {
      id: "2",
      label: "Female",
    },
  ];
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        padding: "1rem",
        borderRadius: "8px",
      }}
    >
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
        <Suspense fallback={<p>Loading...</p>}>
          <ProfileWall />
        </Suspense>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <Box
          sx={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Section sectionHeader={"AVATAR"}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Avatar
                src="https://static.wikia.nocookie.net/rezero/images/6/68/Emilia_ep.41_%283%29.jpg"
                alt="your profile avatar"
                sx={{ width: "110px", height: "110px" }}
              />
              <Button variant="outlined" startIcon={<CameraAlt />}>
                Edit photo
              </Button>
            </Box>
          </Section>
          <Section sectionHeader={"CONTACT"}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Autoco
            </Box>
          </Section>
        </Box>
        <Box
          sx={{
            flex: "1",
          }}
        >
          <Section sectionHeader="PERSONAL">
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <ProfileTextField id="email" label="Email" variant="outlined">
                Changes of name will be reflected across your Courtsite Account,
                but past documents will retain the original profile name.
              </ProfileTextField>
              <ProfileAutocomplete
                id="gender"
                options={gender}
                label="Gender"
              />
            </Box>
          </Section>
        </Box>
      </Box>
    </Box>
  );
};

export default EditProfile;
