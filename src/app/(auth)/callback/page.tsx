"use client";
import { Box, Skeleton, Typography } from "@mui/material";
import cookies from "js-cookie";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

const CallBackHandle = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  console.log("token", token);

  if (!token) {
    router.push("/sign-in");
  } else {
    cookies.set("token", token);
    // router.push("/");
    window.location.href = "/";
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: "neutral.100",
        gap: 2,
      }}
    >
      <Skeleton
        variant="circular"
        sx={{ width: 60, height: 60, bgcolor: "neutral.300" }}
      />
      <Typography variant="body2" color="neutral.500">
        Redirecting... Please wait.
      </Typography>
    </Box>
  );
};

export default CallBackHandle;