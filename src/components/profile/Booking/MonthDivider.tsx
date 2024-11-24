import { Divider } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import React from "react";

interface MonthDividerProps {
  date: Dayjs;
}

const MonthDivider = ({ date }: MonthDividerProps) => {
  return (
    <Divider
      textAlign="left"
      sx={{
        width: "100%",
        fontWeight: "200",
        color: "rgb(109, 105, 123)",
        marginBottom: "1rem",
      }}
    >
      {date.format("MMM YYYY")}
    </Divider>
  );
};

export default MonthDivider;
