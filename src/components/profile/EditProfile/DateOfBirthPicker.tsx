import React, { useContext, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import dayjs, { Dayjs } from "dayjs";
import { UserContext } from "@/context/user-context";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

function DateOfBirthPicker() {
  const context = useContext(UserContext);

  const handleChange = (newValue: Dayjs | null) => {
    if (newValue) {
      context?.setUserData({
        ...context.userData,
        dayOfBirth: newValue.format("YYYY-MM-DD"),
      });
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="Ngày"
          value={
            context?.userData.dayOfBirth
              ? dayjs(context?.userData.dayOfBirth)
              : null
          }
          onChange={handleChange}
          slotProps={{
            textField: {
              InputProps: {
                readOnly: true,
              },
            },
          }}
          disableFuture
          sx={{
            width: "100%",
            ".MuiOutlinedInput-root": {
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--buttonColor)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--buttonColor)",
              },
            },
            ".MuiFormLabel-root": {
              "&.Mui-focused": {
                color: "var(--buttonColor)",
              },
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default DateOfBirthPicker;
