import {
  Box,
  MenuItem,
  Popover,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import React, { useContext, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/de";
import { SearchContext } from "./SearchPanel";
import dayjs, { Dayjs } from "dayjs";

const SelectDateTime = ({
  anchorEl,
  handleClose,
}: {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}) => {
  const { dateTime, setDateTime } = useContext(SearchContext);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [time, setTime] = useState<Dayjs | null>(null);
  const [duration, setDuration] = useState(1);

  const handleChange = (event: SelectChangeEvent) => {
    setDuration(Number(event.target.value));
    setDateTime(
      date?.format("DD/MM/YYYY") +
        " " +
        time?.format("HH:mm A") +
        " - " +
        (time?.add(Number(event.target.value), "hour").format("HH:mm A") || "")
    );
  };

  const cleanDateTime = () => {
    setDate(null);
    setTime(null);
    setDuration(1);
    setDateTime("");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vn">
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          "& .MuiPopover-paper": {
            width: "100%",
            height: "100%",
            maxWidth: "385px",
            maxHeight: "180px",
            padding: "16px",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            Chọn ngày
          </Typography>
          <DatePicker
            sx={{
              "& .MuiInputBase-root": {
                height: "100%",
                maxHeight: "40px",
                width: "100%",
                padding: "10px 12px",
              },
              "& .MuiInputBase-input": {
                padding: "0",
              },
            }}
            value={date}
            format="DD/MM/YYYY"
            onChange={(newDate) => {
              setDate(newDate as Dayjs);
              setDateTime(newDate?.format("DD/MM/YYYY") || "");
            }}
          />
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            Chọn giờ và khoảng thời gian
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
            }}
          >
            <Box flex={1}>
              <TimePicker
                sx={{
                  "& .MuiInputBase-root": {
                    height: "100%",
                    maxHeight: "40px",
                    width: "100%",
                    padding: "10px 12px",
                  },
                  "& .MuiInputBase-input": {
                    padding: "0",
                  },
                }}
                value={time}
                views={["hours", "minutes"]}
                format="HH:mm"
                minutesStep={30}
                minTime={dayjs().hour(6).minute(0)}
                maxTime={dayjs().hour(22).minute(0)}
                onChange={(newTime) => setTime(newTime as Dayjs)}
              />
            </Box>
            <Box flex={1}>
              <Select
                value={duration.toString()}
                onChange={handleChange}
                size="small"
                defaultValue="1"
                fullWidth
              >
                <MenuItem value={1}>1 tiếng</MenuItem>
                <MenuItem value={1.5}>1.5 tiếng</MenuItem>
                <MenuItem value={2}>2 tiếng</MenuItem>
              </Select>
            </Box>
          </Box>
        </Box>
      </Popover>
    </LocalizationProvider>
  );
};

export default SelectDateTime;
