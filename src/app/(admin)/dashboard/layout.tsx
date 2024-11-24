import TimeNavBar from "@/components/overview/time-bar";
import { DashboardProvider } from "@/context/dash-board-context";
import { Box } from "@mui/material";
import React from "react";

const dashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <DashboardProvider>
      <Box>
        <TimeNavBar />
        {children}
      </Box>
    </DashboardProvider>
  );
};

export default dashboardLayout;
