import { Box } from "@mui/material";
import React from "react";

const BookingRootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Box
      sx={{
        padding: 3,
        height: "auto",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "1rem",
        // background: "linear-gradient(to bottom, #f5f5f5,#FFFFFF )",
        background: "#f5f5f5",
      }}
    >
      {children}
    </Box>
  );
};

export default BookingRootLayout;
