import * as React from "react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import {
  Box,
  Button,
  duration,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { BookCourtContext } from "@/app/(user)/book-court/layout";

export default function TimePickerViews({
  handleNext,
  handleBack,
}: {
  handleNext: () => void;
  handleBack: () => void;
}) {
  const { startTime, setStartTime, duration, setDuration } =
    React.useContext(BookCourtContext);
  const [disabledDuration, setDisabledDuration] = React.useState(
    startTime ? false : true
  );
  const [showContinueButton, setShowContinueButton] = React.useState(
    startTime && duration ? true : false
  );

  const maximumRentalTime = 3;

  const handleChangeStartTime = (event: SelectChangeEvent) => {
    setStartTime(event.target.value as string);
    setDisabledDuration(false);
  };

  const handleChangeDuration = (event: SelectChangeEvent) => {
    setDuration(event.target.value as string);
    setShowContinueButton(true);
  };

  const timeOptions = [];
  const now = dayjs();
  const currentHour = now.hour();
  const startHour = Math.max(currentHour + 1, 8);
  for (let hour = startHour; hour <= 22; hour++) {
    const period = hour < 12 ? "AM" : "PM";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    const timeString = `${displayHour}:00 ${period}`;
    timeOptions.push(timeString);
  }

  const timeDurationOptions = [];
  for (let i = 1; i < maximumRentalTime; i++) {
    let durationString = `${i} tiếng`;
    timeDurationOptions.push(durationString);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "15px",
        }}
      >
        <FormControl
          fullWidth
          sx={{
            ".MuiOutlinedInput-root": {
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--buttonColor)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--buttonColor)",
              },
            },
          }}
        >
          <FormHelperText sx={{ fontSize: "16px" }}>Giờ bắt đầu</FormHelperText>
          <Select
            defaultValue={startTime}
            value={startTime}
            onChange={handleChangeStartTime}
          >
            {timeOptions.map((time) => (
              <MenuItem key={time} value={time}>
                {time}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          fullWidth
          disabled={disabledDuration}
          sx={{
            ".MuiOutlinedInput-root": {
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--buttonColor)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--buttonColor)",
              },
            },
          }}
        >
          <FormHelperText sx={{ fontSize: "16px" }}>
            Khoảng thời gian
          </FormHelperText>
          <Select
            defaultValue={duration}
            value={duration}
            onChange={handleChangeDuration}
          >
            {timeDurationOptions.map((time) => (
              <MenuItem key={time} value={time}>
                {time}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "right",
          marginTop: "10px",
        }}
      >
        <Button
          onClick={handleBack}
          variant="outlined"
          sx={{
            color: "var(--buttonColor)",
            borderColor: "var(--buttonColor)",
          }}
        >
          Quay lại
        </Button>
        {showContinueButton && (
          <Button
            onClick={handleNext}
            variant="outlined"
            sx={{
              marginLeft: "10px",
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
    </Box>
  );
}
