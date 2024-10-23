import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { Box, Button } from "@mui/material";
import { BookCourtContext } from "@/app/(user)/book-court/layout";

export default function BasicDatePicker({
  handleNext,
}: {
  handleNext: () => void;
}) {
  const { date, setDate } = React.useContext(BookCourtContext);
  const today = dayjs();
  const minDate = today;
  const maxDate = today.add(7, "day");
  const [showContinueButton, setShowContinueButton] = React.useState(
    date ? true : false
  );

  const handleDateChange = (val: Dayjs | null) => {
    if (val) {
      setDate(val.toISOString());
      setShowContinueButton(true);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="Ngày"
            minDate={minDate}
            maxDate={maxDate}
            defaultValue={date ? dayjs(date) : null}
            onChange={handleDateChange}
            slotProps={{
              textField: {
                InputProps: {
                  readOnly: true,
                },
              },
            }}
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
      {showContinueButton && (
        <Button
          onClick={handleNext}
          variant="outlined"
          sx={{
            marginLeft: "auto",
            marginTop: "10px",
            color: "white",
            borderColor: "var(--buttonColor)",
            backgroundColor: "var(--buttonColor)",
            ":hover": {
              backgroundColor: "var(--buttonHoverColor)",
            },
          }}
        >
          Tiếp tục
        </Button>
      )}
    </Box>
  );
}
