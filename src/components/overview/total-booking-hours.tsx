"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import { AttachMoney, AccessTime } from "@mui/icons-material";
import type { SxProps } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { ArrowDown as ArrowDownIcon } from "@phosphor-icons/react/dist/ssr/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "@phosphor-icons/react/dist/ssr/ArrowUp";
import { CurrencyDollar as CurrencyDollarIcon } from "@phosphor-icons/react/dist/ssr/CurrencyDollar";
import { UseGetBookingHour } from "@/hooks/statistic/useGetBookingHour";
import { DashboardContext } from "@/context/dash-board-context";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { statisticApi } from "@/api/statistic";
import { Skeleton } from "@mui/material";
import { QueryKeys } from "@/constants/query-keys";

export interface TotalBookingHoursProps {
  diff?: number;
  trend: "up" | "down";
  sx?: SxProps;
  value: string;
}

export function TotalBookingHours({
  diff,
  trend,
  sx,
  value,
}: TotalBookingHoursProps): React.JSX.Element {
  const context = React.useContext(DashboardContext);
  const { data, isValidating, mutate } = UseGetBookingHour({
    enabled: true,
    startDate: context?.period.from || dayjs().subtract(1, "month"),
    endDate: context?.period.to || dayjs(),
  });
  React.useEffect(() => {
    mutate();
  }, [context?.period]);
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={3}>
          <Stack
            direction="row"
            sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
            spacing={3}
          >
            <Stack spacing={1}>
              <Typography
                color="text.secondary"
                variant="overline"
                sx={{ fontWeight: "bold" }}
              >
                Tổng giờ đặt
              </Typography>
              {isValidating ? (
                <Skeleton variant="text" sx={{ fontSize: "2.125rem" }} />
              ) : (
                <Typography variant="h4">
                  {data && data.data.result}{" "}
                </Typography>
              )}
            </Stack>
            <Avatar
              sx={{
                backgroundColor: "#635bfa",
                height: "56px",
                width: "56px",
              }}
            >
              <AccessTime
                sx={{
                  fontSize: "2rem",
                }}
              />
            </Avatar>
          </Stack>
          {isValidating ? (
            <Skeleton variant="text" sx={{ fontSize: "1.125rem" }} />
          ) : (
            <Typography
              color="text.secondary"
              variant="h6"
              sx={{ fontWeight: "bold" }}
            >
              giờ
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
