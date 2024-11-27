import { BookCourtContext } from "@/context/book-court-context";
import { formatDate, formatVND } from "@/utils/format";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useContext } from "react";

const BookingInfoConfirmation = ({
  courtPrice,
  handleNext,
  handleBack,
}: {
  courtPrice: number;
  handleNext: () => void;
  handleBack: () => void;
}) => {
  const { date, startTime, duration, totalPrice } =
    useContext(BookCourtContext);
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          "& > *": {
            marginTop: "10px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography>Ngày</Typography>
          <Typography>{formatDate(date)}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography>Giờ bắt đầu</Typography>
          <Typography>{startTime}:00</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography>Khoảng thời gian</Typography>
          <Typography>{duration} tiếng</Typography>
        </Box>
        <Divider
          sx={{
            backgroundColor: "#e7e7e7",
            margin: "15px 0",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography>Chi phí</Typography>
          <Typography>{formatVND(Number(courtPrice))} / 1 tiếng</Typography>
        </Box>
        <Divider
          sx={{
            backgroundColor: "#e7e7e7",
            margin: "15px 0",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography>Tổng tiền</Typography>
          <Typography>{formatVND(Number(totalPrice))}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "right",
          marginTop: "30px",
        }}
      >
        <Button
          onClick={handleBack}
          variant="outlined"
          sx={{
            color: "var(--buttonColor)",
            borderColor: "var(--buttonColor)",
          }}
        >
          Quay lại
        </Button>
        <Button
          onClick={handleNext}
          variant="outlined"
          sx={{
            marginLeft: "10px",
            color: "white",
            borderColor: "var(--buttonColor)",
            backgroundColor: "var(--buttonColor)",
            ":hover": {
              backgroundColor: "var(--buttonHoverColor)",
            },
          }}
        >
          Tiếp tục
        </Button>
      </Box>
    </Box>
  );
};

export default BookingInfoConfirmation;
