"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import type { SxProps } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { ArrowDown as ArrowDownIcon } from "@phosphor-icons/react/dist/ssr/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "@phosphor-icons/react/dist/ssr/ArrowUp";
import { Users as UsersIcon } from "@phosphor-icons/react/dist/ssr/Users";
import { DashboardContext } from "@/context/dash-board-context";
import { UseGetNewUser } from "@/hooks/statistic/useGetNewUser";
import dayjs from "dayjs";
import { Skeleton } from "@mui/material";

export interface TotalUserProps {
  diff?: number;
  trend: "up" | "down";
  sx?: SxProps;
  value: string;
}

export function TotalUser({
  diff,
  trend,
  sx,
  value,
}: TotalUserProps): React.JSX.Element {
  const TrendIcon = trend === "up" ? ArrowUpIcon : ArrowDownIcon;
  const trendColor =
    trend === "up"
      ? "var(--mui-palette-success-main)"
      : "var(--mui-palette-error-main)";
  const context = React.useContext(DashboardContext);
  const { data, isValidating, mutate } = UseGetNewUser({
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
        <Stack spacing={2}>
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
                Tổng người dùng mới
              </Typography>
              {isValidating ? (
                <Skeleton variant="text" sx={{ fontSize: "2.125rem" }} />
              ) : (
                <Typography variant="h4">{data.data.result}</Typography>
              )}
            </Stack>
            <Avatar
              sx={{ backgroundColor: "#15b79f", height: "56px", width: "56px" }}
            >
              <UsersIcon fontSize="2rem" />
            </Avatar>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
