import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/joy/Button";
import Typography from "@mui/material/Typography";
import { Chip, Input } from "@mui/material";
import { CourtImage } from "@/models/court-image";
import { usePutCourtImage } from "@/hooks/court-image/usePutCourtImage";

export default function UploadImage({ image }: { image: CourtImage }) {
  const [imageSrc, setImageSrc] = useState<string>(image.courtImageSrc); // Lưu đường dẫn ảnh hiện tại
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Lưu file mới nếu có
  const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa
  const [isSaving, setIsSaving] = useState(false); // Trạng thái lưu ảnh

  const updateCourtImage = usePutCourtImage();

  // Hàm xử lý khi chọn file mới
  const handleEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file); // Lưu file đã chọn
      const newImageUrl = URL.createObjectURL(file); // Tạo URL tạm thời
      setImageSrc(newImageUrl); // Hiển thị ảnh mới
      setIsEditing(true); // Kích hoạt chế độ lưu
    }
  };

  // Hàm xử lý hủy chỉnh sửa
  const handleCancel = () => {
    setImageSrc(image.courtImageSrc); // Đặt lại ảnh gốc
    setSelectedFile(null); // Xóa file đã chọn
    setIsEditing(false); // Thoát chế độ chỉnh sửa
  };

  // Hàm xử lý lưu ảnh (gửi request API)
  const handleSave = async () => {
    if (!selectedFile) return;

    try {
      setIsSaving(true); // Đang lưu ảnh
      const formData = new FormData();
      formData.append("courtImageSrc", selectedFile);
      formData.append("imageType", image.imageType);

      // Gửi request API để lưu ảnh
      await updateCourtImage(image.id, formData);

      setIsEditing(false); // Tắt chế độ chỉnh sửa
      setSelectedFile(null); // Reset file đã chọn
    } catch (error) {
      console.error("Failed to upload image:", error);
      alert("Failed to upload image!");
    } finally {
      setIsSaving(false); // Kết thúc lưu ảnh
    }
  };

  return (
    <Card sx={{ width: "49%", textAlign: "center" }}>
      {/* Hiển thị ảnh */}
      <CardMedia sx={{ height: 200 }} image={imageSrc} title="Uploaded Image" />

      {/* Các hành động (nút chỉnh sửa/lưu) */}
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Chip
          color="success"
          variant={image.imageType === "main" ? "filled" : "outlined"}
          label={image.imageType === "main" ? "Ảnh chính" : "Ảnh phụ"}
        />
        {/* Nút chỉnh sửa */}
        {!isEditing && (
          <Button variant="plain" component="label" color="success">
            Chỉnh sửa
            <Input
              type="file"
              inputProps={{ accept: "image/*" }}
              onChange={handleEdit}
              sx={{ display: "none" }} // Ẩn input file
            />
          </Button>
        )}

        {/* Nút lưu (hiển thị khi có file được chọn) */}
        {isEditing && (
          <Box>
            <Button
              loading={isSaving}
              variant="plain"
              color="success"
              onClick={handleSave}
            >
              Lưu
            </Button>
            <Button variant="plain" color="danger" onClick={handleCancel}>
              Hủy
            </Button>
          </Box>
        )}
      </CardActions>
    </Card>
  );
}
