import { useContext, useEffect, useState } from "react";
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
import { useGetUnavailableHour } from "@/hooks/court/useGetUnavailableHours";
import OvalLoader from "@/components/shared/OvalLoader";

interface HourPickerProps {
  court: Court;
  hours: string[];
  disabledDuration: boolean;
  timeDurationOptions: number[];
  setShowContinueButton: (value: boolean) => void;
  setTimeDurationOptions: (value: number[]) => void;
}

const HourPicker = ({
  court,
  hours,
  disabledDuration,
  timeDurationOptions,
  setShowContinueButton,
  setTimeDurationOptions,
}: HourPickerProps) => {
  const { startTime, duration, setDuration, setTotalPrice } =
    useContext(BookCourtContext);

  useEffect(() => {
    if (startTime.length > 0) {
      const min = court.minimumRentalTime;
      const max = court.maximumRentalTime;
      let timeDurations = [];
      for (let i = min; i <= max; i++) {
        console.log({ startTime, i });
        timeDurations.push(i);

        if (hours.includes((Number(startTime) + i).toString())) {
          break;
        }
      }
      setTimeDurationOptions(timeDurations);
    }
  }, [startTime]);

  const handleChangeDuration = (event: SelectChangeEvent) => {
    const dur = Number(event.target.value);
    setDuration(dur.toString());
    if (court) setTotalPrice(court?.rentalPricePerHour * dur);
    setShowContinueButton(true);
  };

  return (
    <FormControl
      fullWidth
      disabled={startTime !== "" && disabledDuration}
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
  );
};

export default HourPicker;
