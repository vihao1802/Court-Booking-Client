"use client";
import ProfileWall from "@/components/profile/ProfileWall";
import Section from "@/components/profile/ProfileSection";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { CameraAlt, PhotoCamera } from "@mui/icons-material";
import React, { Suspense, useState } from "react";
import PersonalInfo from "@/components/profile/EditProfile/PersonalInfo";
import PersonalContact from "@/components/profile/EditProfile/PersonalContact";
import UpdateButton from "@/components/profile/EditProfile/UpdateButton";
import { useUpdateUser } from "@/hooks/user/useUpdateUser";
import { UnauthorizedError } from "@/api/http-errors";
import ProfileAvatar from "@/components/profile/EditProfile/ProfileAvatar";
import { useAuthenticatedUser } from "@/hooks/auth/useAuthenticatedUser";
import toast from "react-hot-toast";
const EditProfile = () => {
  const { updateProfileImage, mutate } = useUpdateUser();
  const { user } = useAuthenticatedUser();
  // for modal upload avatar
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Preview the selected image
    }
  };
  const handleUpload = async () => {
    if (selectedFile) {
      if (selectedFile.size >= 5 * 1024 * 1024) {
        toast.error("Kích thước ảnh quá lớn, vui lòng chọn ảnh dưới 5MB");
        return;
      }
      setIsUploading(true);
      const formData = new FormData();
      formData.append("imageFile", selectedFile);
      try {
        const res = await updateProfileImage(formData);
        if (res && res.status === 200) {
          mutate({ ...user, profileImage: preview });
        } else {
          console.error(res);
          toast.error("Cập nhật ảnh đại diện không thành công");
        }
      } catch (error) {
        console.error(error);
        toast.error("Cập nhật ảnh đại diện không thành công");
      }
      handleClose();
      setIsUploading(false);
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        padding: "1rem",
        borderRadius: "8px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          backgroundColor: "white",
          borderRadius: "8px",
          marginBottom: "1rem",
        }}
      >
        <ProfileWall />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <Box
          sx={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Section sectionHeader={"Ảnh đại diện"}>
            <ProfileAvatar handleOpen={handleOpen} />
          </Section>
          <Section sectionHeader={"Thông tin liên hệ"}>
            <PersonalContact />
          </Section>
        </Box>
        <Box
          sx={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Section sectionHeader="Thông tin cá nhân">
            <PersonalInfo />
          </Section>
          <UpdateButton width={"70%"}>Cập nhật</UpdateButton>
        </Box>
      </Box>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" mb={2}>
            Tải ảnh đại diện từ máy
          </Typography>

          {/* Avatar preview */}
          <Box display="flex" justifyContent="center" mb={2}>
            <Avatar
              src={preview || user?.profileImage}
              alt="ảnh đại diện xem trước"
              sx={{ width: 100, height: 100 }}
            />
          </Box>

          {/* File input */}
          <Box display="flex" justifyContent="center" mb={2}>
            <Button
              variant="contained"
              component="label"
              color="success"
              startIcon={<PhotoCamera />}
            >
              Chọn ảnh đại diện
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleFileChange}
              />
            </Button>
          </Box>

          {/* Actions */}
          <Box display="flex" justifyContent="space-between">
            <Button color="success" variant="outlined" onClick={handleClose}>
              Hủy
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleUpload}
              disabled={!selectedFile || isUploading} // Disable if no file selected
            >
              {isUploading ? "Đang tải lên..." : "Tải lên"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default EditProfile;
