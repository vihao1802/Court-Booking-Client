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
import HourPicker from "./HourPicker";

export default function TimePickerViews({
  handleNext,
  handleBack,
  court,
}: {
  handleNext: () => void;
  handleBack: () => void;
  court: Court;
}) {
  const { startTime, setStartTime, duration, date } =
    useContext(BookCourtContext);
  const [disabledDuration, setDisabledDuration] = useState(
    startTime ? false : true
  );
  const [showContinueButton, setShowContinueButton] = useState(
    startTime && duration ? true : false
  );
  const [timeDurationOptions, setTimeDurationOptions] = useState<number[]>([]);

  const { data: hours, isLoading } = useGetUnavailableHour({
    courtId: court.id,
    date,
  });

  if (isLoading || !hours) {
    return <OvalLoader />;
  }

  const handleChangeStartTime = (event: SelectChangeEvent) => {
    const t = Number(event.target.value);
    setStartTime(t.toString());
    setDisabledDuration(false);
  };

  console.log({ timeDurationOptions });

  const hourOptions = [];
  const now = dayjs();
  const currentHour = now.hour();
  const startHour = Math.max(currentHour + 1, 8);

  if (!hours) return;
  for (let hour = startHour; hour <= 22; hour++) {
    if (hours.includes(hour.toString())) {
      if (!hours.includes((hour + 1).toString())) {
        hourOptions.push(hour);
      }
    } else {
      hourOptions.push(hour);
    }
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
            {hourOptions.map((time) => (
              <MenuItem key={time} value={time}>
                {time}:00
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {!disabledDuration ? (
          <HourPicker
            court={court}
            hours={hours}
            disabledDuration={disabledDuration}
            timeDurationOptions={timeDurationOptions}
            setShowContinueButton={setShowContinueButton}
            setTimeDurationOptions={setTimeDurationOptions}
          />
        ) : (
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
            <Select defaultValue={duration} value={duration}></Select>
          </FormControl>
        )}
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
