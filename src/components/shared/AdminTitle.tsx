import { Typography, Box } from "@mui/material";
import React from "react";

interface AdminTitleProps {
  title: string;
  subtitle: string;
}

const AdminTitle = ({ title, subtitle }: AdminTitleProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" fontWeight="bold" sx={{ mb: "5px" }}>
        {title}
      </Typography>
      <Typography variant="h6" color="#858585">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default AdminTitle;
