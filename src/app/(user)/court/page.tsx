import { Box, Paper, Typography } from "@mui/material";
import Image from "next/image";
import coverPic from "@/assets/images/search-venue.jpg";
import React from "react";

const Courts = () => {
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
          height: "200px",
          width: "100%",
          position: "relative",
        }}
      >
        <Image
          src={coverPic}
          alt="cover"
          style={{
            objectFit: "cover",
            objectPosition: "center",
            width: "100%",
            height: "200px",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
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
            Đặt sân để trải nghiệm
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            height: "100%",
            width: "1056px",
            margin: "0 auto",
            padding: "20px",
          }}
        ></Paper>
      </Box>
    </Box>
  );
};

export default Courts;
