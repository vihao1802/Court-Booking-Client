import React, { Dispatch, SetStateAction } from "react";
import Avatar from "@mui/joy/Avatar";
import Chip from "@mui/joy/Chip";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import CardActions from "@mui/joy/CardActions";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import SvgIcon from "@mui/joy/SvgIcon";
import { User } from "@/models/user";
import dayjs from "dayjs";

interface UserInfoProps {
  user: Partial<User>;
  setDisable: Dispatch<SetStateAction<number>>;
  setConfirmContent: Dispatch<
    SetStateAction<{ title: string; content: string }>
  >;
  handleClickOpenConfirmDialog: () => void;
}

export default function UserInfo({
  user,
  setDisable,
  setConfirmContent,
  handleClickOpenConfirmDialog,
}: UserInfoProps) {
  const handleClick = () => {
    setDisable(0);
    setConfirmContent({
      title: "Bỏ chặn người dùng",
      content: `Bạn có chắc chắn muốn bỏ chặn người dùng ${user.userName}?`,
    });
    handleClickOpenConfirmDialog();
  };

  return (
    <Card sx={{ width: 320, maxWidth: "100%", boxShadow: "lg" }}>
      <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
        <Avatar src={user.profileImage} sx={{ "--Avatar-size": "4rem" }} />
        <Chip
          size="sm"
          variant="soft"
          color={user.isDisabled ? "danger" : "success"}
          sx={{
            mt: -1,
            mb: 1,
            border: "3px solid",
            borderColor: "background.surface",
          }}
        >
          {user.isDisabled ? "Đã chặn" : "Đang hoạt động"}
        </Chip>
        <Typography level="title-lg">{user.userName}</Typography>
        <Box
          sx={{
            alignItems: "left",
            textAlign: "left",
          }}
        >
          <Typography level="body-sm" sx={{ maxWidth: "24ch" }}>
            User ID: {user.id?.split("-")[0]}
          </Typography>
          <Typography level="body-sm" sx={{ maxWidth: "24ch" }}>
            Phone: {user.phoneNumber}
          </Typography>
          <Typography level="body-sm" sx={{ maxWidth: "24ch" }}>
            Created at: {dayjs(user.createdAt).format("DD/MM/YYYY")}
          </Typography>

          <Typography level="body-sm" sx={{ maxWidth: "24ch" }}>
            Location: {user.location}
          </Typography>
          <Typography level="body-sm" sx={{ maxWidth: "24ch" }}>
            Birthday: {dayjs(user.dayOfBirth).format("DD/MM/YYYY")}
          </Typography>
          <Typography level="body-sm" sx={{ maxWidth: "24ch" }}>
            Email: {user.email}
          </Typography>
        </Box>
      </CardContent>
      {Boolean(user.isDisabled) && (
        <CardOverflow sx={{ bgcolor: "background.level1" }}>
          <CardActions buttonFlex="1">
            <ButtonGroup
              variant="outlined"
              sx={{ bgcolor: "background.surface" }}
            >
              <Button color="success" onClick={handleClick}>
                Bỏ Chặn
              </Button>
            </ButtonGroup>
          </CardActions>
        </CardOverflow>
      )}
    </Card>
  );
}
