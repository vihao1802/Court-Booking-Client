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
const EditProfile = () => {
  const { updateProfileImage, mutate } = useUpdateUser();
  // for modal upload avatar
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
      console.log("Uploading file:", selectedFile);
      if (selectedFile.size >= 2 * 1024 * 1024) {
        return;
      }
      const formData = new FormData();
      formData.append("imageFile", selectedFile);

      try {
        await updateProfileImage(formData);
      } catch (error) {
        console.error(error);
        if (error instanceof UnauthorizedError) {
          throw new UnauthorizedError();
        }
      }
      handleClose();
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
        <Suspense fallback={<p>Loading...</p>}>
          <ProfileWall />
        </Suspense>
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
          <Section sectionHeader={"AVATAR"}>
            <ProfileAvatar handleOpen={handleOpen} />
          </Section>
          <Section sectionHeader={"CONTACT"}>
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
          <Section sectionHeader="PERSONAL">
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
            Upload Avatar
          </Typography>

          {/* Avatar preview */}
          <Box display="flex" justifyContent="center" mb={2}>
            <Avatar
              src={preview || ""}
              alt="Preview"
              sx={{ width: 100, height: 100 }}
            />
          </Box>

          {/* File input */}
          <Box display="flex" justifyContent="center" mb={2}>
            <Button
              variant="contained"
              component="label"
              startIcon={<PhotoCamera />}
            >
              Choose File
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
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              disabled={!selectedFile} // Disable if no file selected
            >
              Upload
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default EditProfile;
