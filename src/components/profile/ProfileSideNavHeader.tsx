import React from "react";
import {
  WidthFull,
  Person2,
  ExpandLess,
  ExpandMore,
  Inbox,
} from "@mui/icons-material";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  useRouter,
  usePathname,
  useSearchParams,
  useParams,
} from "next/navigation";

const ProfileSideNavHeader = () => {
  const [openMe, setOpenMe] = React.useState(true);
  const [openAcc, setOpenAcc] = React.useState(true);
  const router = useRouter();
  const pathname = usePathname().split("/")[2];
  const userId = useParams().id;

  const handleClick = () => {
    setOpenMe(!openMe);
  };
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    endpoint: string
  ) => {
    router.push(`/${endpoint}`);
    console.log("endpoint", endpoint);
  };
  return (
    <Box
      style={{
        backgroundColor: "white",
        padding: "1em",
        width: "100%",
        maxWidth: "288px",
        borderRadius: "8px",
      }}
    >
      <Box
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ListItemButton
          onClick={handleClick}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            color: "rgb(109 105 123)",
          }}
        >
          <ListItemText primary="ME" />
          {openMe ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse
          in={openMe}
          timeout="auto"
          unmountOnExit
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <List component="div" disablePadding>
            <ListItemButton
              selected={pathname === ""}
              onClick={(event) => handleListItemClick(event, `user/${userId}`)}
            >
              <ListItemIcon>
                <Person2 />
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItemButton>
          </List>
          <List component="div" disablePadding>
            <ListItemButton
              selected={pathname === "booking"}
              onClick={(event) =>
                handleListItemClick(event, `user/${userId}/booking`)
              }
            >
              <ListItemIcon>
                <Person2 />
              </ListItemIcon>
              <ListItemText primary="My Bookings" />
            </ListItemButton>
          </List>
        </Collapse>
        {/* Account Setting */}
        <ListItemButton
          onClick={handleClick}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            color: "rgb(109 105 123)",
          }}
        >
          <ListItemText primary="ACCOUNT SETTINGS" />
          {openMe ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse
          in={openAcc}
          timeout="auto"
          unmountOnExit
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <List component="div" disablePadding>
            <ListItemButton
              selected={pathname === "edit"}
              onClick={(event) =>
                handleListItemClick(event, `user/${userId}/edit`)
              }
            >
              <ListItemIcon>
                <Person2 />
              </ListItemIcon>
              <ListItemText primary="Edit Profile" />
            </ListItemButton>
          </List>
        </Collapse>
      </Box>
    </Box>
  );
};

export default ProfileSideNavHeader;
