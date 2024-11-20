import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import React from "react";

interface AutocompleteProps {
  id: string;
  label?: string;
  size?: "small" | "medium";
  options: any[];
  defaultValue?: any;
  children?: React.ReactNode;
  onChangeHandle?: (
    e: React.SyntheticEvent<Element, Event>,
    value: any
  ) => void;
}
const ProfileAutocomplete: React.FC<AutocompleteProps> = ({
  id,
  label,
  defaultValue,
  size = "small",
  options,
  children,
  onChangeHandle,
}) => {
  const [value, setValue] = React.useState(
    defaultValue ? options.find((option) => option.id === 1) : options[1]
  );

  return (
    <Box>
      <Autocomplete
        id={id}
        disablePortal
        value={value}
        getOptionLabel={(option) => option.label}
        onChange={(event, newValue) => {
          setValue(newValue);
          console.log("new value", newValue);
          onChangeHandle && onChangeHandle(event, newValue.value);
        }}
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
