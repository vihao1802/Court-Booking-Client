"use client";

import { Avatar, Box, Button, Divider, Icon, Typography } from "@mui/material";
import { Lato } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { navItems } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import AppLogo from "./Logo";

const lato = Lato({ subsets: ["latin"], weight: ["400"] });

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = true;

  return (
    <Box
      sx={{
        width: "100%",
        height: "120px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          padding: "10px 20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0 auto",
            maxWidth: "1056px",
            width: "100%",
            // height: "70px",
          }}
        >
          <AppLogo />

          {isLogin ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
                height: "100%",
                width: "100%",
                maxHeight: "56px",
                maxWidth: "104px",
                padding: "8px 12px",
                borderRadius: "20px",
                border: "1px solid #e5e7eb",
                cursor: "pointer",
              }}
            >
              <Icon>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-7 text-blue-grey"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3 5C3 4.44772 3.44772 4 4 4H16C16.5523 4 17 4.44772 17 5C17 5.55228 16.5523 6 16 6H4C3.44772 6 3 5.55228 3 5Z"
                    fill="currentColor"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3 10C3 9.44772 3.44772 9 4 9H10C10.5523 9 11 9.44772 11 10C11 10.5523 10.5523 11 10 11H4C3.44772 11 3 10.5523 3 10Z"
                    fill="currentColor"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3 15C3 14.4477 3.44772 14 4 14H16C16.5523 14 17 14.4477 17 15C17 15.5523 16.5523 16 16 16H4C3.44772 16 3 15.5523 3 15Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </Icon>
              <Avatar>HC</Avatar>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
              }}
            >
              <Button
                variant="outlined"
                color="success"
                onClick={() => router.push("/sign-up")}
              >
                Đăng ký
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => router.push("/sign-in")}
              >
                Đăng nhập
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      <Divider />

      {/* menu bar */}
      <Box
        sx={{
          height: "50px",
          display: "flex",
          padding: "10px 20px",
        }}
      >
        <Box
          sx={{
            width: "1056px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {navItems.map((item, index) => (
            <Link href={item.url} key={index}>
              <Typography
                sx={{
                  fontWeight: 400,
                  color: "#222222",
                  padding: "5px",
                  borderRadius: "10px",
                  transition: "0.3s",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                  ...(pathname === item.url && {
                    fontWeight: "bold",
                  }),
                }}
              >
                {item.name}
              </Typography>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
