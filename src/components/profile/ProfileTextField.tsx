import { Box, TextField, TextFieldVariants, Typography } from "@mui/material";
import React from "react";
interface ProfileTextFieldProps {
  id: string;
  variant?: TextFieldVariants;
  label?: string;
  type?: string;
  description?: string;
  disable?: boolean;
  size?: "small" | "medium";
  error?: boolean;
  helptext?: string;
  children?: React.ReactNode;
  onChangeHandle?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
const ProfileTextField: React.FC<ProfileTextFieldProps> = ({
  id,
  variant = "outlined",
  type,
  label,
  description,
  disable,
  size = "small",
  error,
  helptext,
  children,
  onChangeHandle,
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
        error={error}
        helperText={error ? helptext : ""}
        variant={variant}
        label={label}
        size={size}
        disabled={disable || false}
        type={type || "text"}
        value={children}
        onChange={(e) => {
          onChangeHandle && onChangeHandle(e);
        }}
        sx={{
          width: "100%",
        }}
      />
      {description && (
        <Typography
          sx={{
            color: "gray",
            fontSize: "0.7rem",
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default ProfileTextField;
