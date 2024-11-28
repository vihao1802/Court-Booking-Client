import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import courtDemo from "@/assets/images/court_demo.png";
import { useAuthenticatedUser } from "@/hooks/auth/useAuthenticatedUser";
import { Court } from "@/models/court";

interface CourtProps {
  key: number;
  court: Court;
}

const CourtCard = ({ key, court }: CourtProps) => {
  const router = useRouter();
  const { user } = useAuthenticatedUser();

  return (
    <Card
      sx={{
        width: {
          xs: "100%",
          sm: "calc(50% - 12px)",
          md: "calc(33.33% - 12px)",
        },
      }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        image={
          court.courtImageList.find((image) => image.imageType === "main")
            ?.courtImageSrc
        }
        sx={{
          height: "200px"
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {court.courtName}
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {court.courtDescription}
        </Typography>
      </CardContent>

      {/* <Rating name="read-only" value={4} readOnly sx={{ padding: "0 10px" }} /> */}
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Button
          variant="outlined"
          startIcon={<VisibilityOutlinedIcon />}
          sx={{
            width: "50%",
            color: "var(--buttonColor)",
            borderColor: "gray",
            ":hover": {
              borderColor: "var(--buttonHoverColor)",
            },
          }}
          onClick={() => router.push(`/court/${court.id}`)}
        >
          Chi tiết
        </Button>
        <Button
          variant="contained"
          sx={{
            width: "50%",
            backgroundColor: "var(--buttonColor)",
            ":hover": {
              backgroundColor: "var(--buttonHoverColor)",
            },
          }}
          onClick={() => {
            const url = `/book-court/${court.id}/date-time`;
            if (!user) {
              localStorage.setItem("pageNextUrl", url);
            }
            router.push(url);
          }}
        >
          Đặt ngay
        </Button>
      </CardActions>
    </Card>
  );
};

export default CourtCard;
