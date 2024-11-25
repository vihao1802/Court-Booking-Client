"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import type { SxProps } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Receipt as ReceiptIcon } from "@phosphor-icons/react/dist/ssr/Receipt";
import { DashboardContext } from "@/context/dash-board-context";
import { UseGetRevenue } from "@/hooks/statistic/useGetRevenue";
import dayjs from "dayjs";
import { Skeleton } from "@mui/material";
import OvalLoader from "../shared/OvalLoader";

export interface TotalRevenueProps {
  sx?: SxProps;
  value: string;
}

export function TotalRevenue({
  value,
  sx,
}: TotalRevenueProps): React.JSX.Element {
  const context = React.useContext(DashboardContext);
  const { data, isValidating, mutate } = UseGetRevenue({
    enabled: true,
    startDate: context?.period.from || dayjs().subtract(1, "month"),
    endDate: context?.period.to || dayjs(),
  });
  React.useEffect(() => {
    mutate();
  }, [context?.period]);

  if (!data) return <OvalLoader />;
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
                Doanh thu
              </Typography>
              {isValidating ? (
                <Skeleton variant="text" sx={{ fontSize: "2.125rem" }} />
              ) : (
                <Typography variant="h4">{data.data.result}</Typography>
              )}
            </Stack>
            <Avatar
              sx={{ backgroundColor: "#fb9c0c", height: "56px", width: "56px" }}
            >
              <ReceiptIcon fontSize="var(--icon-fontSize-lg)" />
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
              VND
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
