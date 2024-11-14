import { Box, TextField, TextFieldVariants, Typography } from "@mui/material";
import React from "react";
interface ProfileTextFieldProps {
  id: string;
  variant?: TextFieldVariants;
  label?: string;
  size?: "small" | "medium";
  children?: React.ReactNode;
}
const ProfileTextField: React.FC<ProfileTextFieldProps> = ({
  id,
  variant = "outlined",
  label,
  size = "small",
  children,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <TextField
        id={id}
        variant={variant}
        label={label}
        size={size}
        sx={{
          width: "100%",
        }}
      />
      {children && (
        <Typography
          sx={{
            color: "gray",
            fontSize: "0.7rem",
          }}
        >
          {children}
        </Typography>
      )}
    </Box>
  );
};

export default ProfileTextField;
