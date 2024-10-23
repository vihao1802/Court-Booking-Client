"use client";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

interface BoxBookingButtonProps {
  courtId: string;
  rentalPricePerHour: number;
  minimumRentalTime: number;
  maximumRentalTime: number;
}

const BoxBookingButton = ({
  courtId,
  rentalPricePerHour,
  minimumRentalTime,
  maximumRentalTime,
}: BoxBookingButtonProps) => {
  const [loading, setLoading] = useState(false);

  return (
    <Box
      sx={{
        width: "30%",
        marginLeft: "auto",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: "80px",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          padding: "15px",
          border: "2px solid #DBDBDB",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <Typography>Giá thuê</Typography>
          <Typography>
            {rentalPricePerHour.toLocaleString("vi-VN")} đ / 1 tiếng
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <Typography>Giờ thuê tối thiểu</Typography>
          <Typography>{minimumRentalTime} tiếng</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <Typography>Giờ thuê tối đa</Typography>
          <Typography>{maximumRentalTime} tiếng</Typography>
        </Box>
        <Button
          sx={{
            backgroundColor: "var(--buttonColor)",
            color: "white",
            ":hover": {
              backgroundColor: "var(--buttonHoverColor)",
            },
            ":disabled": {
              backgroundColor: "gray",
            },
          }}
          disabled={loading}
        >
          <Link
            className="w-full h-full"
            href={`/book-court/date-time/${courtId}`}
            onClick={() => setLoading(true)}
          >
            Đặt sân ngay
          </Link>
        </Button>
      </Box>
    </Box>
  );
};

export default BoxBookingButton;
