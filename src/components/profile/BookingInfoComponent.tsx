import { Box, Typography } from "@mui/material";
import React, { Suspense } from "react";

interface BookingInfoComponentProps {
  title: string;
  info: string;
  children?: React.ReactNode;
}
const BookingInfoComponent: React.FC<BookingInfoComponentProps> = ({
  children,
  title,
  info,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "var(--buttonColor)",
          fontWeight: "500",
          fontSize: "1.5rem",
        }}
      >
        {info}
      </Typography>
      <Typography variant="body2" color="rgb(109 105 123)">
        {title}
      </Typography>
    </Box>
  );
};

export default BookingInfoComponent;
