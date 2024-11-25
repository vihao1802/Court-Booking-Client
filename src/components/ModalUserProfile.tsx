"use client";

import { Box, Button, Typography, Link } from "@mui/material";
import { Lato } from "next/font/google";
import Image from "next/image";
import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
import { CalendarToday, Close, Person } from "@mui/icons-material";
import { User } from "@/models/user";

const lato = Lato({ subsets: ["latin"], weight: ["400"] });

interface ModalUserProfileProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: User;
  logout: () => void;
}

const ModalUserProfile = ({
  open,
  user,
  setOpen,
  logout,
}: ModalUserProfileProps) => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      logout();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menuContainer = document.querySelector(".menu-container");
      if (
        open &&
        menuContainer &&
        !event.composedPath().includes(menuContainer)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <Box
      sx={{
        position: "absolute",
        top: open ? "120%" : "90%",
        right: 0,
        maxWidth: "400px",
        padding: "20px 16px",
        borderRadius: "10px",
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
        backgroundColor: "#EBEEFD",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        zIndex: 1000,
        transition: "all ease 0.3s",
        opacity: open ? 1 : 0,
        visibility: open ? "visible" : "hidden",
      }}
      className="menu-container"
    >
      <Close
        sx={{
          position: "absolute",
          top: "20px",
          right: "30px",
          cursor: "pointer",
          color: "#48445a",
          ":hover": {
            color: "#2C6BFF",
          },
        }}
        fontSize="large"
        onClick={() => setOpen(false)}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
          maxWidth: "400px",
          width: "380px",
        }}
      >
        <Box
          component="img"
          src={user.profileImage}
          sx={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
          }}
        />
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: "bold",
            marginTop: "10px",
          }}
        >
          Xin chào, {user.userName}
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            color: "#666666",
            marginBottom: "10px",
          }}
        >
          {user.email}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
          borderRadius: "25px",
          padding: "10px 0",
          textAlign: "left",
          fontSize: "16px",
          marginBottom: "30px",
        }}
      >
        <Link
          sx={{
            textDecoration: "none",
            color: "#48445a",
            padding: "10px 25px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderBottom: "2px solid #EBEEFD",
            ":hover": {
              color: "#2C6BFF",
            },
          }}
          href={"/user/profile/booking"}
          // onClick={() => router.push("/user/profile")}
        >
          <CalendarToday
            sx={{
              marginRight: "20px",
              fontSize: "18px",
              color: "#a5b4fc",
            }}
          />
          Lịch đặt sân
        </Link>
        <Link
          sx={{
            textDecoration: "none",
            color: "#48445a",
            padding: "10px 25px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            ":hover": {
              color: "#2C6BFF",
            },
          }}
          href={"/user/profile"}
          // onClick={() => router.push("/user/profile")}
        >
          <Person
            sx={{
              marginRight: "20px",
              fontSize: "18px",
              color: "#a5b4fc",
            }}
          />
          Thông tin cá nhân
        </Link>
      </Box>

      <Button
        sx={{
          color: "#48445a",
          textAlign: "center",
          cursor: "pointer",
          padding: "0",
          margin: "0 auto",
          ":hover": {
            textDecoration: "underline",
          },
        }}
        onClick={handleSignOut}
      >
        Đăng xuất
      </Button>
    </Box>
  );
};

export default ModalUserProfile;
