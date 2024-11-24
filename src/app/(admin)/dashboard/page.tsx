"use client";
import React, { Suspense } from "react";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";
import { TotalBookingHours } from "@/components/overview/total-booking-hours";
import { LatestProducts } from "@/components/overview/latest-products";
import { Sales } from "@/components/overview/sales";
import { TasksProgress } from "@/components/overview/tasks-progress";
import { TotalUser } from "@/components/overview/total-users";
import { TotalRevenue } from "@/components/overview/total-revenue";
import { Traffic } from "@/components/overview/traffic";
import { Box } from "@mui/material";
import { LatestReservation } from "@/components/overview/latest-reservation";

export default function Page(): React.JSX.Element {
  return (
    <Grid
      container
      spacing={3}
      justifyContent={{ lg: "space-evenly", xs: "center" }}
      sx={{
        paddingLeft: "1rem",
        paddingTop: "1rem",
      }}
    >
      {/* total booking hours */}
      <Grid size={{ lg: 3, sm: 6, xs: 12 }}>
        <TotalBookingHours
          diff={12}
          trend="up"
          sx={{ height: "100%" }}
          value="$24k"
        />
      </Grid>
      {/* total user */}
      <Grid size={{ lg: 3, sm: 6, xs: 12 }}>
        <TotalUser
          diff={16}
          trend="down"
          sx={{ height: "100%" }}
          value="1.6k"
        />
      </Grid>
      {/* Revenue */}
      <Grid size={{ lg: 3, sm: 6, xs: 12 }}>
        <TotalRevenue sx={{ height: "100%" }} value="$15k" />
      </Grid>
      {/* sale chart */}
      <Grid size={{ lg: 8, xs: 12 }}>
        <Sales sx={{ height: "100%" }} />
      </Grid>
      {/* latest order */}
      <Grid size={{ lg: 12, sm: 12, xs: 12 }}>
        <LatestReservation sx={{ height: "100%" }} />
      </Grid>
    </Grid>
  );
}
