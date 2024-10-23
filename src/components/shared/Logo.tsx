import { Box, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lato } from "next/font/google";
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

const AppLogo = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        gap: 1,
        padding: "0 5px",
      }}
      onClick={() => router.push("/")}
    >
      <Image src="/icons/court.png" alt="icon" height={32} width={32} />
      <Typography
        fontSize="32px"
        fontFamily={lato.style.fontFamily}
        sx={{ color: "var(--buttonColor)" }}
      >
        courtsite
      </Typography>
    </Box>
  );
};

export default AppLogo;
