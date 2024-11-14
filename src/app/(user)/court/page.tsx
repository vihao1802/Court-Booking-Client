"use client";

import { Box, Paper, Typography } from "@mui/material";
import Image from "next/image";

import React from "react";
import SearchPanel from "@/components/search-panel/SearchPanel";
import FeaturedCourts from "@/components/shared/FeaturedCourts";

const Courts = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 120px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SearchPanel />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <FeaturedCourts />
      </Box>
    </Box>
  );
};

export default Courts;
