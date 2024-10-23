"use client";

import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import Image from "next/image";
import React, { SyntheticEvent, useState } from "react";
import coverPic from "@/assets/images/cover_desktop.jpg";
import CourtCard from "@/components/shared/CourtCard";
import { exploreCategoriesTabs } from "@/constants";

interface Court {
  value: string;
  type: string;
  courtList: { id: string; name: string; people: number }[];
}

const courts: Court[] = [
  {
    value: "1",
    type: "Cầu lông",
    courtList: [
      { id: "1-1", name: "Sân cầu lông 1", people: 4 },
      { id: "1-2", name: "Sân cầu lông 2", people: 4 },
      { id: "1-3", name: "Sân cầu lông 3", people: 4 },
      { id: "1-4", name: "Sân cầu lông 4", people: 4 },
      { id: "1-5", name: "Sân cầu lông 5", people: 4 },
      { id: "1-6", name: "Sân cầu lông 6", people: 4 },
      { id: "1-7", name: "Sân cầu lông 7", people: 4 },
      { id: "1-8", name: "Sân cầu lông 8", people: 4 },
    ],
  },
  {
    value: "2",
    type: "Bóng bàn",
    courtList: [
      { id: "2-1", name: "Sân bóng bàn 1", people: 2 },
      { id: "2-2", name: "Sân bóng bàn 2", people: 2 },
      { id: "2-3", name: "Sân bóng bàn 3", people: 2 },
      { id: "2-4", name: "Sân bóng bàn 4", people: 2 },
      { id: "2-5", name: "Sân bóng bàn 5", people: 2 },
      { id: "2-6", name: "Sân bóng bàn 6", people: 2 },
    ],
  },
  {
    value: "3",
    type: "Futsal",
    courtList: [
      { id: "3-1", name: "Sân futsal 1", people: 10 },
      { id: "3-2", name: "Sân futsal 2", people: 10 },
      { id: "3-3", name: "Sân futsal 3", people: 10 },
      { id: "3-4", name: "Sân futsal 4", people: 10 },
    ],
  },
  {
    value: "4",
    type: "Bóng chuyền",
    courtList: [
      { id: "4-1", name: "Sân bóng chuyền 1", people: 12 },
      { id: "4-2", name: "Sân bóng chuyền 2", people: 12 },
      { id: "4-3", name: "Sân bóng chuyền 3", people: 12 },
    ],
  },
  {
    value: "5",
    type: "Bóng đá",
    courtList: [
      { id: "5-1", name: "Sân bóng đá 1", people: 22 },
      { id: "5-2", name: "Sân bóng đá 2", people: 22 },
      { id: "5-3", name: "Sân bóng đá 3", people: 22 },
    ],
  },
  {
    value: "6",
    type: "Tenis",
    courtList: [
      { id: "6-1", name: "Sân tenis 1", people: 4 },
      { id: "6-2", name: "Sân tenis 2", people: 4 },
      { id: "6-3", name: "Sân tenis 3", people: 4 },
      { id: "6-4", name: "Sân tenis 4", people: 4 },
    ],
  },
  {
    value: "7",
    type: "Bóng rổ",
    courtList: [
      { id: "7-1", name: "Sân bóng rổ 1", people: 10 },
      { id: "7-2", name: "Sân bóng rổ 2", people: 10 },
      { id: "7-3", name: "Sân bóng rổ 3", people: 10 },
    ],
  },
];

const Home = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event: SyntheticEvent, newid: string) => {
    setValue(newid);
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 120px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          height: "500px",
          width: "100%",
          position: "relative",
        }}
      >
        <Image
          src={coverPic}
          alt="cover"
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center",
            width: "100%",
            height: "500px",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Adjust opacity here
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
            zIndex: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: "38px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Hệ thống hỗ trợ đặt sân trực tuyến
          </Typography>
          <Typography
            sx={{
              fontSize: "22px",
              color: "white",
            }}
          >
            Đặt sân nhanh chóng, dễ dàng và tiện lợi với courtsite ngay hôm nay
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "20px",
          zIndex: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            height: "100%",
            maxWidth: "1056px",
            width: "100%",
            margin: "0 auto",
            padding: {
              xs: "0",
              sm: "20px",
            },
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Sân nổi bật
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TabContext value={value}>
              <Box
                sx={{
                  width: "100%",
                  marginTop: "20px",
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{
                    color: "var(--buttonColor)",
                    "& .MuiTab-root.Mui-selected": {
                      color: "var(--buttonColor)",
                    },
                    "& .MuiButtonBase-root": {
                      gap: 1,
                    },
                  }}
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: "var(--buttonColor)",
                    },
                  }}
                >
                  {exploreCategoriesTabs.map((tab, index) => (
                    <Tab
                      icon={tab.icon}
                      label={tab.label}
                      value={tab.value}
                      key={index}
                    />
                  ))}
                </Tabs>
              </Box>

              <TabPanel
                value={value}
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(1,1fr)",
                    sm: "repeat(2,1fr)",
                    md: "repeat(3,1fr)",
                  },
                  padding: "10px 0",
                  gap: 2,
                }}
              >
                {courts
                  .filter((item) => item.value === value)
                  .map((court) =>
                    court.courtList.map((courtItem) => (
                      <CourtCard
                        key={courtItem.id}
                        id={courtItem.id}
                        name={courtItem.name}
                        people={courtItem.people}
                        type={court.type}
                      />
                    ))
                  )}
              </TabPanel>
            </TabContext>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Home;
