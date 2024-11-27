import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { Box, Button } from "@mui/material";
import { BookCourtContext } from "@/context/book-court-context";
import { useGetAvailableDate } from "@/hooks/court/useGetAvailableDate";
import OvalLoader from "@/components/shared/OvalLoader";

export default function BasicDatePicker({
  courtId,
  handleNext,
}: {
  courtId: string;
  handleNext: () => void;
}) {
  const { date, setDate } = React.useContext(BookCourtContext);
  const [showContinueButton, setShowContinueButton] = React.useState(
    date ? true : false
  );
  const { data: availableDates, isLoading } = useGetAvailableDate({ courtId });

  const handleDateChange = (val: Dayjs | null) => {
    if (val) {
      setDate(val.format("YYYY-MM-DD"));
      setShowContinueButton(true);
    }
  };

  if (isLoading || !availableDates) {
    return <OvalLoader />;
  }

  const today = dayjs();
  const minDate = today;
  const maxDate = today.add(availableDates.length, "day");

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
            shouldDisableDate={(date) =>
              !availableDates.includes(dayjs(date).format("YYYY-MM-DD"))
            }
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
