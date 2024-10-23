import {
  Divider,
  Button,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from "@mui/material";
import React, { useState } from "react";
import BasicDatePicker from "./DatePicker";
import TimePickerViews from "./TimePicker";
import BookingInfoConfirmation from "./BookingInfoConfirmation";
import { useParams, useRouter } from "next/navigation";
import { randomBytes } from "crypto";
import { v4 as uuidv4 } from "uuid";

const steps = [
  {
    label: "Chọn ngày",
  },
  {
    label: "Chọn giờ bắt và khoảng thời gian",
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

  const handleNext = () => {
    setCompletedSteps((prev) => ({ ...prev, [activeStep]: true }));
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCheckout = async () => {
    setLoadingNextPage(true);
    const reservation_id = uuidv4();
    console.log(reservation_id);

    try {
      // const res = await fetch("")
      router.push(`/book-court/payment/${reservation_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  function NavigateStepper() {
    if (activeStep === 0) {
      return <BasicDatePicker handleNext={handleNext} />;
    } else if (activeStep === 1) {
      return (
        <TimePickerViews handleNext={handleNext} handleBack={handleBack} />
      );
    } else if (activeStep === 2) {
      return (
        <BookingInfoConfirmation
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
          padding: "10px",
          boxShadow: "0 5px 25px rgba(0, 0, 0, 0.2)",
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
          padding: "10px",
          boxShadow: "0 5px 25px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
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
                Trần Vĩ Hào
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography>Số điện thoại</Typography>
              <Typography>0912345678</Typography>
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
                Sân Tennis A
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
                Tennis
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
                273 Đ. An Dương Vương, Phường 3, Quận 5, Hồ Chí Minh
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BookingDetails;
