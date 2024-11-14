"use client";
import ProfileSideNavHeader from "@/components/profile/ProfileSideNavHeader";
import { Box } from "@mui/material";
import React, { Suspense } from "react";

export default function UserRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Box
        style={{
          backgroundColor: "#f5f5f5",
        }}
      >
        <Box
          style={{
            maxWidth: "1056px",
            minHeight: "100vh",
            margin: "0 auto",
          }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              paddingTop: "1.5em",
              gap: "1em",
            }}
          >
            <ProfileSideNavHeader />
            {children}
          </Box>
        </Box>
      </Box>
    </main>
  );
}
