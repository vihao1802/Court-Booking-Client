import {
  Divider,
  Button,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Skeleton,
} from "@mui/material";
import React, { useState } from "react";
import BasicDatePicker from "./DatePicker";
import TimePickerViews from "./TimePicker";
import BookingInfoConfirmation from "./BookingInfoConfirmation";
import { useParams, useRouter } from "next/navigation";
import { reservationApi } from "@/api/reservation";
import { useAuthenticatedUser } from "@/hooks/auth/useAuthenticatedUser";
import toast from "react-hot-toast";
import { useGetCourtById } from "@/hooks/court/useGetCourtById";
import OvalLoader from "@/components/shared/OvalLoader";
import { BookCourtContext } from "@/context/book-court-context";
import dayjs from "dayjs";

const steps = [
  {
    label: "Chọn ngày",
  },
  {
    label: "Chọn giờ bắt đầu và khoảng thời gian",
  },
  {
    label: "Xác nhận",
  },
];

const BookingDetails = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<{
    [key: number]: boolean;
  }>({});
  const router = useRouter();
  const [loadingNextPage, setLoadingNextPage] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthenticatedUser();
  const { date, startTime, duration, totalPrice } =
    React.useContext(BookCourtContext);

  const { data: court, error, isLoading } = useGetCourtById({ courtId: id });

  if (isLoading || !court) {
    return <OvalLoader />;
  }

  if (!isLoading && (court === undefined || court === null)) {
    router.push("/");
    return <OvalLoader />;
  }

  if (error) {
    toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
    return null;
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  const handleNext = () => {
    setCompletedSteps((prev) => ({ ...prev, [activeStep]: true }));
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCheckout = async () => {
    setLoadingNextPage(true);
    try {
      const reservationDate = date;
      const checkInTime = startTime;
      const checkOutTime = (Number(startTime) + Number(duration)).toString();

      const vietnamOffset = 7 * 60 * 60 * 1000;
      const createdAt = new Date(
        new Date().getTime() + vietnamOffset
      ).toISOString();

      const res = await reservationApi.createReservation({
        checkInTime: checkInTime,
        checkOutTime: checkOutTime,
        totalPrice: totalPrice,
        reservationDate: reservationDate,
        userId: user.id,
        courtId: court.id,
        createdAt: createdAt,
      });

      if (res) {
        toast.success("Đặt lịch thành công");
        router.push(`/book-court/reservation/${res.id}/checkout`);
      } else {
        toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
        setLoadingNextPage(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
      setLoadingNextPage(false);
    }
  };

  function NavigateStepper() {
    if (activeStep === 0 && court) {
      return <BasicDatePicker courtId={court.id} handleNext={handleNext} />;
    } else if (activeStep === 1 && court) {
      return (
        <TimePickerViews
          handleNext={handleNext}
          handleBack={handleBack}
          court={court}
        />
      );
    } else if (activeStep === 2 && court) {
      return (
        <BookingInfoConfirmation
          courtPrice={court.rentalPricePerHour ?? 0}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      );
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column-reverse",
          md: "row",
        },
        gap: "32px",
      }}
    >
      <Box
        sx={{
          flex: 2,
          padding: "0 10px",
          // boxShadow: "0 5px 25px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            padding: "10px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stepper activeStep={activeStep} orientation="vertical" nonLinear>
            {steps.map((step, index) => (
              <Step key={step.label} completed={completedSteps[index]}>
                <StepLabel
                  sx={{
                    "& .Mui-active": {
                      "& .MuiStepIcon-root": {
                        color: "var(--buttonColor)",
                      },
                      "& .MuiStepConnector-line": {
                        color: "var(--buttonColor)",
                      },
                    },
                    "& .Mui-completed": {
                      "& .MuiStepIcon-root": {
                        color: "var(--buttonColor)",
                      },
                      "& .MuiStepConnector-line": {
                        borderColor: "var(--buttonColor)",
                      },
                    },
                    "& .MuiStepIcon-root": {
                      color: "gray",
                    },
                  }}
                >
                  {step.label}
                </StepLabel>
                <StepContent>
                  <NavigateStepper />
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "right",
                padding: "10px 0 0",
                marginTop: "auto",
              }}
            >
              {!loadingNextPage && (
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
              )}
              <Button
                onClick={handleCheckout}
                disabled={loadingNextPage}
                variant="outlined"
                sx={{
                  marginLeft: "10px",
                  color: "white",
                  borderColor: "var(--buttonColor)",
                  backgroundColor: "var(--buttonColor)",
                  ":hover": {
                    backgroundColor: "var(--buttonHoverColor)",
                  },
                  ":disabled": {
                    backgroundColor: "gray",
                  },
                }}
              >
                Đến thanh toán
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          // maxWidth: "350px",
          // width: "100%",
          flex: 1,
          padding: "20px 10px",
          boxShadow: { sm: "none", md: "rgba(0, 0, 0, 0.2) 0px 0px 4px" },
          borderRadius: "7px",
          height: "fit-content",
        }}
      >
        <Box
          sx={{
            padding: "0 10px",
            "& > * + *": {
              marginTop: "20px",
            },
          }}
        >
          <Box>
            <Typography sx={{ textAlign: "center", fontSize: "20px" }}>
              Thông tin đặt chỗ
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography>Họ tên</Typography>
              <Typography
                sx={{
                  fontWeight: "500",
                }}
              >
                {user?.userName}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography>Số điện thoại</Typography>
              <Typography>{user?.phoneNumber}</Typography>
            </Box>
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  flex: 1,
                }}
              >
                Tên sân
              </Typography>
              <Typography
                sx={{
                  flex: 2,
                  textAlign: "right",
                }}
              >
                {court.courtName}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
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
                {court.courtType.courtTypeName}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  flex: 1,
                }}
              >
                Địa chỉ
              </Typography>
              <Typography
                sx={{
                  flex: 2,
                  textAlign: "right",
                }}
              >
                {court.courtAddress}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BookingDetails;
