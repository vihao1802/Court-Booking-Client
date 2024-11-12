"use client";

import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { exploreCategoriesTabs } from "@/constants";
import { useParams } from "next/navigation";
import CourtCard from "@/components/shared/CourtCard";

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

const page = () => {
  const params = useParams();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        padding: "20px",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          height: "100%",
          width: "1056px",
          maxWidth: "100%",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <Typography variant="h5" p="0 10px">
          {exploreCategoriesTabs.find((item) => item.value === params.id)
            ?.label || "Category not found"}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            padding: "10px",
            gap: 2,
          }}
        >
          {courts
            .filter((item) => item.value === params.id)
            .map((court) =>
              court.courtList.map((courtItem) => (
                <CourtCard
                  key={courtItem.id}
                  name={courtItem.name}
                  people={courtItem.people}
                  type={court.type}
                />
              ))
            )}
        </Box>
      </Paper>
    </Box>
  );
};

export default page;
