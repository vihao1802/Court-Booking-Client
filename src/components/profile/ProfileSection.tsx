"use client";
import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";

interface SectionProps {
  sectionHeader: string;
  sectionButton?: string;
  children: React.ReactNode;
  className?: string;
  handleButtonClick?: () => void;
}
const Section: React.FC<SectionProps> = ({
  sectionHeader,
  sectionButton,
  handleButtonClick,
  children,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.5rem",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: "500",
            color: "rgb(109 105 123)",
          }}
        >
          {sectionHeader}
        </Typography>
        {sectionButton && (
          <Button
            variant="text"
            sx={{
              color: "var(--buttonColor)",
            }}
            onClick={() => handleButtonClick && handleButtonClick()}
          >
            {sectionButton}
          </Button>
        )}
      </Box>
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
        {children}
      </Box>
    </Box>
  );
};

export default Section;
