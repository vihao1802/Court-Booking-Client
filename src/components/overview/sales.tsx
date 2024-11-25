"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import { alpha, useTheme } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material/styles";
import { ArrowClockwise as ArrowClockwiseIcon } from "@phosphor-icons/react/dist/ssr/ArrowClockwise";
import { ArrowRight as ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import type { ApexOptions } from "apexcharts";
import { Chart } from "@/components/overview/chart";
import { DashboardContext } from "@/context/dash-board-context";
import { UseGetRevenueByMonth } from "@/hooks/statistic/useGetRevenueByMonth";
import dayjs from "dayjs";
import { ChartData } from "@/models/chart-data";
import { AspectRatio, Skeleton } from "@mui/joy";
import { Typography } from "@mui/material";
import ChartSkeleton from "./skeleton/ChartSkeleton";

export interface SalesProps {
  sx?: SxProps;
}

export function Sales({ sx }: SalesProps): React.JSX.Element {
  const context = React.useContext(DashboardContext);
  const theme = useTheme();
  const { data, isValidating, mutate } = UseGetRevenueByMonth({
    enabled: true,
    startDate: context?.period.from || dayjs().subtract(1, "month"),
    endDate: context?.period.to || dayjs(),
  });
  const [chartOptions, setChartOptions] = React.useState<ApexOptions>();
  const [revenue, setRevenue] = React.useState<{ data: number[] } | null>(null);

  React.useEffect(() => {
    if (data) {
      const list_category = data.data.result.map((item: ChartData) => {
        return (
          dayjs()
            .month(item.month - 1)
            .format("MMMM") +
          " " +
          dayjs().year(item.year).format("YYYY")
        );
      });
      const list_revenue = data.data.result.map(
        (item: ChartData) => item.revenue
      );
      setChartOptions(useChartOptions(theme, list_category));
      setRevenue({ data: list_revenue });
    }
  }, [data]);

  React.useEffect(() => {
    mutate();
  }, [context?.period]);

  return (
    <Card sx={sx}>
      <CardHeader title="Doanh thu" />
      <CardContent>
        {isValidating ? (
          <ChartSkeleton
            sx={{
              width: "100%", // Chiều rộng của container
              height: "20rem", // Chiều cao của container
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1,
              p: 2, // Padding
              border: "1px solid var(--joy-palette-neutral-outlinedBorder)",
              borderRadius: "md",
            }}
          />
        ) : (
          <Chart
            height={350}
            options={chartOptions}
            series={[{ name: "Doanh thu", data: revenue?.data || [] }]}
            type="bar"
            width="100%"
          />
        )}
      </CardContent>
      <Divider />
    </Card>
  );
}

function useChartOptions(theme: Theme, categories: string[]): ApexOptions {
  return {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: { show: false },
    },
    colors: [
      theme.palette.success.main, // Màu chính của success
      alpha(theme.palette.success.main, 0.25), // Màu nhạt hơn, với alpha
    ],
    dataLabels: { enabled: false },
    fill: { opacity: 1, type: "solid" },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    legend: { show: false },
    plotOptions: { bar: { columnWidth: "40px" } },
    stroke: { colors: ["transparent"], show: true, width: 2 },
    theme: { mode: theme.palette.mode },
    xaxis: {
      axisBorder: { color: theme.palette.divider, show: true },
      axisTicks: { color: theme.palette.divider, show: true },
      categories: categories,
      labels: { offsetY: 5, style: { colors: theme.palette.text.secondary } },
    },
    yaxis: {
      labels: {
        formatter: (value) => (value > 0 ? `${value / 1000}K` : `${value}`),
        offsetX: -10,
        style: { colors: theme.palette.text.secondary },
      },
    },
  };
}
