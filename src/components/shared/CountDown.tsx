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
              <AccessAlarmsRounded sx={{ color: "var(--buttonHoverColor)" }} />
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{
                  color: "var(--buttonHoverColor)",
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
