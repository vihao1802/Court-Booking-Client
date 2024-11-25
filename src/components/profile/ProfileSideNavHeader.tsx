import React from "react";
import {
  WidthFull,
  Person2,
  ExpandLess,
  ExpandMore,
  Inbox,
  BookOnline,
  Edit,
  Lock,
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
  const pathname = usePathname();

  const handleClick = () => {
    setOpenMe(!openMe);
  };
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    endpoint: string
  ) => {
    router.push(`${endpoint}`);
  };

  const NAVIGATE_ENDPOINT = [
    {
      group: "CÁ NHÂN",
      item: [
        {
          title: "Trang cá nhân",
          url: "/user/profile",
          icon: Person2,
        },
        {
          title: "Lịch đặt",
          url: "/user/profile/booking",
          icon: BookOnline,
        },
      ],
    },
    {
      group: "TÀI KHOẢN",
      item: [
        {
          title: "Chỉnh sửa thông tin",
          url: "/user/profile/edit",
          icon: Edit,
        },
        {
          title: "Đổi mật khẩu",
          url: "/user/profile/change-password",
          icon: Lock,
        },
      ],
    },
  ];
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
        {NAVIGATE_ENDPOINT.map((group, groupIndex) => {
          const groupHeader = (
            <ListItemButton
              key={`group-header-${groupIndex}`}
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
              <ListItemText primary={group.group} />
              {openMe ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          );
          const groupItem = group.item.map((item, itemIndex) => (
            <Collapse
              key={`group-item-${groupIndex}-${itemIndex}`}
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
                  selected={pathname === item.url}
                  onClick={(event) => handleListItemClick(event, item.url)}
                >
                  {item.icon && (
                    <ListItemIcon>
                      <item.icon />
                    </ListItemIcon>
                  )}
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </List>
            </Collapse>
          ));
          return [groupHeader, ...groupItem];
        })}
      </Box>
    </Box>
  );
};

export default ProfileSideNavHeader;
