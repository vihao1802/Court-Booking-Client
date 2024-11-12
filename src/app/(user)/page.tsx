"use client";

import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

import FeaturedCourts from "@/components/shared/FeaturedCourts";
import SearchPanel from "@/components/search-panel/SearchPanel";

const Home = () => {
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
          zIndex: 2,
        }}
      >
        <FeaturedCourts />
      </Box>
    </Box>
  );
};

export default Home;
