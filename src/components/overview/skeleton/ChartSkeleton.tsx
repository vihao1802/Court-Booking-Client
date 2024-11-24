import React from "react";
import { Box, Skeleton } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

interface ChartSkeletonProps {
  sx?: SxProps;
}
const ChartSkeleton = ({ sx }: ChartSkeletonProps) => {
  return (
    <Box
      sx={
        sx || {
          width: 400, // Chiều rộng của container
          height: 300, // Chiều cao của container
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
          p: 2, // Padding
          border: "1px solid var(--joy-palette-neutral-outlinedBorder)",
          borderRadius: "md",
        }
      }
    >
      {/* Cột biểu đồ giả lập */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          height: "80%",
          width: "100%",
          gap: 1,
        }}
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            sx={{
              width: 30,
              height: `${Math.random() * 80 + 20}%`, // Random chiều cao
              borderRadius: 2,
            }}
          />
        ))}
      </Box>
      {/* Nhãn trục X */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          mt: 1,
        }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} variant="text" sx={{ width: 20, height: 10 }} />
        ))}
      </Box>
    </Box>
  );
};

export default ChartSkeleton;
