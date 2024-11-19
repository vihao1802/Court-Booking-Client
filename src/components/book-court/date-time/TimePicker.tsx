import { useContext, useState } from "react";
import dayjs from "dayjs";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { BookCourtContext } from "@/app/(user)/book-court/layout";
import { Court } from "@/models/court";

export default function TimePickerViews({
  handleNext,
  handleBack,
  court,
}: {
  handleNext: () => void;
  handleBack: () => void;
  court: Court | undefined;
}) {
  const { startTime, setStartTime, duration, setDuration, setTotalPrice } =
    useContext(BookCourtContext);
  const [disabledDuration, setDisabledDuration] = useState(
    startTime ? false : true
  );
  const [showContinueButton, setShowContinueButton] = useState(
    startTime && duration ? true : false
  );

  const maximumRentalTime = court?.maximumRentalTime || 1;

  const handleChangeStartTime = (event: SelectChangeEvent) => {
    const t = Number(event.target.value);
    setStartTime(t.toString());
    setDisabledDuration(false);
  };

  const handleChangeDuration = (event: SelectChangeEvent) => {
    const dur = Number(event.target.value);
    setDuration(dur.toString());
    if (court) setTotalPrice(court?.rentalPricePerHour * dur);
    setShowContinueButton(true);
  };

  const timeOptions = [];
  const now = dayjs();
  const currentHour = now.hour();
  const startHour = Math.max(currentHour + 1, 8);
  for (let hour = startHour; hour <= 22; hour++) {
    timeOptions.push(hour);
  }

  const timeDurationOptions = [];
  for (let i = 1; i <= maximumRentalTime; i++) {
    timeDurationOptions.push(i);
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
                {time}:00
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
                {time} tiếng
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
