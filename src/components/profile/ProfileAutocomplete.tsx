import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import React from "react";

interface AutocompleteProps {
  id: string;
  label?: string;
  size?: "small" | "medium";
  options: any[];
  children?: React.ReactNode;
}
const ProfileAutocomplete: React.FC<AutocompleteProps> = ({
  id,
  label,
  size = "small",
  options,
  children,
}) => {
  return (
    <Box>
      <Autocomplete
        id={id}
        disablePortal
        size={size}
        options={options}
        sx={{ width: "100%" }}
        renderInput={(params) => <TextField {...params} label={label} />}
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

export default ProfileAutocomplete;
