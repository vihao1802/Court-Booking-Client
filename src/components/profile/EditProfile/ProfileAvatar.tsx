import { UserContext } from "@/context/user-context";
import { CameraAlt } from "@mui/icons-material";
import { Avatar, Box, Button } from "@mui/material";
import React, { useContext } from "react";

interface ProfileAvatarProps {
  handleOpen: () => void;
}
const ProfileAvatar = ({ handleOpen }: ProfileAvatarProps) => {
  const context = useContext(UserContext);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Avatar
        src={context?.userData?.profileImage}
        alt="your profile avatar"
        sx={{ width: "110px", height: "110px" }}
      />
      <Button
        variant="outlined"
        color="success"
        startIcon={<CameraAlt />}
        onClick={handleOpen}
      >
        Đổi ảnh
      </Button>
    </Box>
  );
};

export default ProfileAvatar;
