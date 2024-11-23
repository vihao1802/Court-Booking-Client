"use client";

import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Divider,
} from "@mui/material";
import {
  MenuOutlined,
  SettingsOutlined,
  ExitToAppOutlined,
} from "@mui/icons-material";
import { sideBarItems } from "@/constants/index";
import React, { useState } from "react";
import AppLogo from "@/components/shared/Logo";
import { usePathname } from "next/navigation";
import Link from "next/link";

const LeftSideBar = () => {
  const pathname = usePathname();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClickMenuMore = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenuMore = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        zIndex: 1200,
        position: "fixed",
      }}
    >
      <Box
        sx={{
          width: "250px",
          height: "100vh",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid #e2e8f0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "10%",
            padding: "0 20px",
            gap: "10px",
          }}
        >
          <AppLogo />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "90%",
          }}
        >
          <List>
            {sideBarItems.map((item, index) => {
              const isActive =
                (pathname.includes(item.route) && item.route.length > 1) ||
                pathname === item.route;

              return (
                <Link href={item.route} key={index}>
                  <ListItem key={index}>
                    <ListItemButton
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                        },
                        padding: "7px 12px",
                        borderRadius: "7px",
                        height: "46px",
                      }}
                    >
                      <ListItemIcon sx={{ color: "black", fontSize: "20px" }}>
                        {isActive ? item.iconActive : item.iconNonActive}
                      </ListItemIcon>

                      <ListItemText
                        primary={
                          <Typography fontWeight={isActive ? "bold" : "normal"}>
                            {item.label}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
              );
            })}
          </List>

          <List>
            <ListItem>
              <ListItemButton
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                  padding: "7px 12px",
                  borderRadius: "7px",
                }}
                onClick={handleClickMenuMore}
              >
                <ListItemIcon>
                  <MenuOutlined />
                </ListItemIcon>
                <ListItemText primary="More" />
              </ListItemButton>
            </ListItem>
          </List>
          <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenuMore}>
            <List disablePadding>
              <ListItem>
                <ListItemButton onClick={handleCloseMenuMore}>
                  <ListItemIcon>
                    <ExitToAppOutlined />
                  </ListItemIcon>
                  <ListItemText primary="Log out" />
                </ListItemButton>
              </ListItem>
            </List>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default LeftSideBar;
