import React, { useEffect, useState } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import { Box, Typography, IconButton, Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CourtImage } from "@/models/court-image";

type FileWithPreview = File & {
  preview: string;
};

interface ImagesUploadProps {
  value: (FileWithPreview | CourtImage)[]; // Danh sách file hiện tại
  onChange: (files: (FileWithPreview | CourtImage)[]) => void; // Callback để truyền danh sách file lên component cha
}

const ImagesUpload = ({ value, onChange }: ImagesUploadProps) => {
  // Hàm xử lý khi người dùng kéo/thả file
  const onDrop: DropzoneOptions["onDrop"] = (acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    onChange([...value, ...newFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    multiple: true,
  });

  // Hàm xóa file khỏi danh sách
  const removeFile = (file: FileWithPreview | CourtImage) => {
    onChange(value.filter((f) => f !== file));
    if (file instanceof File) URL.revokeObjectURL(file.preview); // Dọn dẹp URL preview
  };

  return (
    <Box
      sx={{
        p: 2,
        border: "2px dashed gray",
        borderRadius: "8px",
      }}
    >
      <Box
        {...getRootProps()}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />

        <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>
          Kéo thả file vào đây hoặc nhấp để chọn file
        </Typography>
      </Box>

      {/* Hiển thị danh sách file */}
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        {value.map((file, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              alt={file instanceof File ? file.name : file.imageType}
              src={file instanceof File ? file.preview : file.courtImageSrc}
              height="100px"
              width="100px"
              borderRadius="5px"
              sx={{ objectFit: "cover" }}
            />
            <IconButton
              onClick={() => removeFile(file)}
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                transform: "translate(50%, -50%)",
                backgroundColor: "white",
                "&:hover": { backgroundColor: "lightgray" },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ImagesUpload;
