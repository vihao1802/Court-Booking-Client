"use client";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Box, IconButton, Modal } from "@mui/material";

interface ModalSliderImagesProps {
  handleClose: () => void;
  setEmergedImage: (image: string) => void;
  open: boolean;
  emergedImage: string;
  sliderImages: string[];
}

const ModalSliderImages = ({
  handleClose,
  setEmergedImage,
  open,
  emergedImage,
  sliderImages,
}: ModalSliderImagesProps) => {
  const previousImage = () => {
    for (let i = 0; i < sliderImages.length; i++) {
      if (sliderImages[i] === emergedImage) {
        if (i === 0) setEmergedImage(sliderImages[sliderImages.length - 1]);
        else setEmergedImage(sliderImages[i - 1]);
        return;
      }
    }
  };

  const nextImage = () => {
    for (let i = 0; i < sliderImages.length; i++) {
      if (sliderImages[i] === emergedImage) {
        if (i === sliderImages.length - 1) setEmergedImage(sliderImages[0]);
        else setEmergedImage(sliderImages[i + 1]);
        return;
      }
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.9)",
      }}
    >
      <Box>
        <IconButton
          sx={{
            position: "absolute",
            left: "20%",
            top: "50%",
            transform: "translateY(-50%)",
            color: "white",
          }}
          onClick={() => previousImage()}
        >
          <ArrowBackIosNew fontSize="large" />
        </IconButton>

        <IconButton
          sx={{
            position: "absolute",
            right: "20%",
            top: "50%",
            transform: "translateY(-50%)",
            color: "white",
          }}
          onClick={() => nextImage()}
        >
          <ArrowForwardIos fontSize="large" />
        </IconButton>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "none",
            outline: "none",
            width: "80%",
            maxWidth: "700px",
            aspectRatio: "16 / 9",
          }}
        >
          <Box
            component="img"
            src={emergedImage}
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "10px",
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalSliderImages;
