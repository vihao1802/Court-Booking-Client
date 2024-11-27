"use client";
import BoxBookingButton from "@/components/court-detail/BoxBookingButton";
import ModalSliderImages from "@/components/court-detail/ModalSliderImages";
import Loader from "@/components/shared/TennisBallLoader";
import { Avatar, Box, Rating, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useGetCourtById } from "@/hooks/court/useGetCourtById";
import { CourtImage } from "@/models/court-image";

interface Court {
  id: number;
  name: string;
  mainImageSrc: string;
  subImage1Src: string;
  subImage2Src: string;
  subImage3Src: string;
  subImage4Src: string;
  rentalPricePerHour: number;
  minimumRentalTime: number;
  maximumRentalTime: number;
}

const courts: Court[] = [
  {
    id: 1,
    name: "Sân Tennis A",
    mainImageSrc:
      "https://corsairathletics.com/images/2023/8/8/IMG_1449_o98sJ.JPG",
    subImage1Src:
      "https://vmkonsport.com/wp-content/uploads/2023/03/Different-Areas-of-the-Tennis-Court-1024x576.jpg",
    subImage2Src:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqVoFujgeMgWHTAePvtndx29v6IdyRHCQaPg&s",
    subImage3Src:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS8T6ep9171hgtUxkTRerdRNIZpZ7gJ7Cbgw&s",
    subImage4Src:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlnI5PPeS8gE9Rdrt8cwU7eV23rYf1OVbwJg&s",
    rentalPricePerHour: 20000,
    minimumRentalTime: 1,
    maximumRentalTime: 2,
  },
  {
    id: 2,
    name: "Sân Tennis B",
    mainImageSrc:
      "https://corsairathletics.com/images/2023/8/8/IMG_1449_o98sJ.JPG",
    subImage1Src:
      "https://vmkonsport.com/wp-content/uploads/2023/03/Different-Areas-of-the-Tennis-Court-1024x576.jpg",
    subImage2Src:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqVoFujgeMgWHTAePvtndx29v6IdyRHCQaPg&s",
    subImage3Src:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS8T6ep9171hgtUxkTRerdRNIZpZ7gJ7Cbgw&s",
    subImage4Src:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlnI5PPeS8gE9Rdrt8cwU7eV23rYf1OVbwJg&s",
    rentalPricePerHour: 20000,
    minimumRentalTime: 1,
    maximumRentalTime: 4,
  },
  {
    id: 3,
    name: "Sân Tennis C",
    mainImageSrc:
      "https://corsairathletics.com/images/2023/8/8/IMG_1449_o98sJ.JPG",
    subImage1Src:
      "https://vmkonsport.com/wp-content/uploads/2023/03/Different-Areas-of-the-Tennis-Court-1024x576.jpg",
    subImage2Src:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqVoFujgeMgWHTAePvtndx29v6IdyRHCQaPg&s",
    subImage3Src:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS8T6ep9171hgtUxkTRerdRNIZpZ7gJ7Cbgw&s",
    subImage4Src:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlnI5PPeS8gE9Rdrt8cwU7eV23rYf1OVbwJg&s",
    rentalPricePerHour: 20000,
    minimumRentalTime: 1,
    maximumRentalTime: 2,
  },
];

const CourtDetail = ({ params: { id } }: { params: { id: string } }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = (imgSrc: string) => {
    setOpen(true);
    setEmergedImage(imgSrc);
  };
  const handleClose = () => setOpen(false);
  const [emergedImage, setEmergedImage] = useState("");
  const [sliderImages, setSliderImages] = useState<string[]>([]);

  const { data: courtDetail, isLoading: isCourtLoading } = useGetCourtById({
    courtId: id,
  });

  console.log(courtDetail);

  if (isCourtLoading) return <Loader />;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1056px",
        marginX: "auto",
        padding: "24px 5px",
      }}
    >
      <ModalSliderImages
        handleClose={handleClose}
        setEmergedImage={setEmergedImage}
        open={open}
        emergedImage={emergedImage}
        sliderImages={sliderImages}
      />
      <Typography
        sx={{
          fontSize: "26px",
          fontWeight: "600",
        }}
      >
        {courtDetail?.courtName}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "repeat(2, 200px)",
          gap: "8px",
          padding: "20px 0",
        }}
      >
        {courtDetail?.courtImageList.map((image: CourtImage, index: number) =>
          image?.imageType === "main" ? (
            <Box
              key={index}
              sx={{
                gridColumn: "span 2",
                gridRow: "span 2",
              }}
            >
              <Box
                component="img"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "10px 0 0 10px",
                  cursor: "pointer",
                }}
                onClick={() => handleOpen(image?.courtImageSrc)}
                src={image?.courtImageSrc}
              />
            </Box>
          ) : (
            <Box
              key={index}
              component="img"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                cursor: "pointer",
              }}
              onClick={() => handleOpen(image?.courtImageSrc)}
              src={image?.courtImageSrc}
            />
          )
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            width: "55%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Typography>Loại sân</Typography>
            <Typography
              sx={{
                backgroundColor: "var(--buttonLightColor)",
                color: "var(--buttonColor)",
                borderRadius: "15px",
                padding: "2px 10px",
              }}
            >
              {courtDetail?.courtType?.courtTypeName}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <Typography>Địa chỉ</Typography>
            <Typography
              sx={{
                maxWidth: "450px",
                width: "100%",
                textAlign: "right",
              }}
            >
              {courtDetail?.courtAddress}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <Typography>Mô tả</Typography>
            <Typography
              sx={{
                maxWidth: "450px",
                width: "100%",
                textAlign: "right",
              }}
            >
              {courtDetail?.courtDescription}
            </Typography>
          </Box>
          {/* <Box
            sx={{
              padding: "30px 0",
            }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "600",
                textTransform: "none",
                marginBottom: "10px",
              }}
            >
              Đánh giá
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography
                component="legend"
                sx={{ marginRight: "10px", fontSize: "35px" }}
              >
                4.5/5
              </Typography>
              <Rating
                name="rating-read-only"
                value={4.5}
                precision={0.5}
                size="large"
                readOnly
              />
            </Box>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "500",
                color: "gray",
              }}
            >
              (5 đánh giá)
            </Typography>
          </Box> 
          
          <Box
            sx={{
              padding: "20px 0",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Avatar
                alt="Cindy Baker"
                src="https://mui.com/static/images/avatar/1.jpg"
                sx={{
                  marginRight: "20px",
                }}
              />

              <Box>
                <Typography>Cindy Baker</Typography>
                <Rating
                  name="rating-read-only"
                  value={4.5}
                  precision={0.5}
                  size="medium"
                  readOnly
                  sx={{
                    marginLeft: "-2px",
                  }}
                />
                <Typography
                  sx={{
                    color: "gray",
                    fontWeight: "400",
                    fontSize: "14px",
                    marginBottom: "20px",
                  }}
                >
                  2024-10-03 11:50
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "500",
                  }}
                >
                  Sân đẹp và thoáng mát. Bãi đỗ xe khá vắng nên cũng dễ dàng ra
                  vào mà không phải bon chen.
                </Typography>
              </Box>
            </Box>
          </Box>
          */}
        </Box>
        {/* Box booking button*/}
        {courtDetail && (
          <BoxBookingButton
            courtId={courtDetail?.id}
            rentalPricePerHour={courtDetail?.rentalPricePerHour}
            minimumRentalTime={courtDetail?.minimumRentalTime}
            maximumRentalTime={courtDetail?.maximumRentalTime}
          />
        )}
      </Box>
    </Box>
  );
};

export default CourtDetail;
