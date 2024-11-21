import * as React from "react";
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

export default function BioCard({
  id,
  userName,
  email,
  phoneNumber,
  dayOfBirth,
  createdAt,
  location,
  isDisabled,
  profileImage,
}: Partial<User>) {
  return (
    <Card sx={{ width: 320, maxWidth: "100%", boxShadow: "lg" }}>
      <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
        <Avatar src={profileImage} sx={{ "--Avatar-size": "4rem" }} />
        <Chip
          size="sm"
          variant="soft"
          color={isDisabled ? "danger" : "success"}
          sx={{
            mt: -1,
            mb: 1,
            border: "3px solid",
            borderColor: "background.surface",
          }}
        >
          {isDisabled ? "Đã chặn" : "Đang hoạt động"}
        </Chip>
        <Typography level="title-lg">{userName}</Typography>
        <Box
          sx={{
            alignItems: "left",
            textAlign: "left",
          }}
        >
          <Typography level="body-sm" sx={{ maxWidth: "24ch" }}>
            User ID: {id?.split("-")[0]}
          </Typography>
          <Typography level="body-sm" sx={{ maxWidth: "24ch" }}>
            Phone: {phoneNumber}
          </Typography>
          <Typography level="body-sm" sx={{ maxWidth: "24ch" }}>
            Created at: {dayjs(createdAt).format("DD/MM/YYYY")}
          </Typography>

          <Typography level="body-sm" sx={{ maxWidth: "24ch" }}>
            Location: {location}
          </Typography>
          <Typography level="body-sm" sx={{ maxWidth: "24ch" }}>
            Birthday: {dayjs(dayOfBirth).format("DD/MM/YYYY")}
          </Typography>
          <Typography level="body-sm" sx={{ maxWidth: "24ch" }}>
            Email: {email}
          </Typography>
        </Box>
      </CardContent>
      {Boolean(isDisabled) && (
        <CardOverflow sx={{ bgcolor: "background.level1" }}>
          <CardActions buttonFlex="1">
            <ButtonGroup
              variant="outlined"
              sx={{ bgcolor: "background.surface" }}
            >
              <Button color="success">Bỏ Chặn</Button>
            </ButtonGroup>
          </CardActions>
        </CardOverflow>
      )}
    </Card>
  );
}
