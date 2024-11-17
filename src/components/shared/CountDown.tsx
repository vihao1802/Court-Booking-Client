import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { AccessAlarmsRounded } from "@mui/icons-material";
import Countdown, { zeroPad } from "react-countdown";

interface CountdownProps {
  timeInMinute?: number;
  onComplete: () => void;
}

const CountdownComponent = ({
  timeInMinute = 0.2,
  onComplete,
}: CountdownProps) => {
  return useMemo(() => {
    return (
      <Countdown
        date={Date.now() + timeInMinute * 1000 * 60}
        renderer={({ minutes, seconds }) => {
          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <AccessAlarmsRounded sx={{ color: "var(--buttonColor)" }} />
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  color: "var(--buttonColor)",
                }}
              >
                {zeroPad(minutes)}:{zeroPad(seconds)}
              </Typography>
            </Box>
          );
        }}
        zeroPadTime={2}
        onComplete={onComplete}
      />
    );
  }, []);
};

export default CountdownComponent;
