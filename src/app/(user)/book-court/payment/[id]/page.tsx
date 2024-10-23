"use client";
import React, { Fragment, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { Button, Divider, StepLabel, Typography } from "@mui/material";
import { ColorlibStepIcon } from "@/components/styles/StepperStyles";
import { BookCourtContext } from "../../layout";
import { useParams, useRouter } from "next/navigation";
import { formatDate } from "@/utils/date";

const steps = ["Đặt lịch", "Thanh toán", "Hoàn tất"];

const BookCourtPaymentPage = () => {
  const { date, startTime, duration } = useContext(BookCourtContext);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (!date || !startTime || !duration) {
      router.push("/");
    }
  }, []);

  const handlePayment = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/payment/${id}/zalo-pay`
      );

      if (res.ok) {
        const data = await res.json();
        console.log(data.body.order_url);
        router.push(data.body.order_url);
      }
    } catch (error) {
      console.log("handlePayment: " + error);
    }
  };

  if (!date || !startTime || !duration) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ color: "red" }}>
          Chưa thể đến bước thanh toán
        </Typography>
      </Box>
    );
  }

  return (
    <Fragment>
      <Stepper
        activeStep={2}
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
          marginBottom: "40px",
        }}
      >
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          return (
            <Step
              key={label}
              {...stepProps}
              sx={{
                padding: "5px",
              }}
            >
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: "600px",
            width: "100%",
            padding: "10px",
            boxShadow: "0 5px 10px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            "& > * + *": {
              marginTop: "20px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
            }}
          >
            <Box
              sx={{
                flex: 1,
              }}
            >
              <Typography
                sx={{
                  color: "var(--buttonColor)",
                }}
              >
                Tennis
              </Typography>
              <Typography
                sx={{
                  color: "var(--buttonHoverColor)",
                }}
                variant="h5"
              >
                Sân Tennis A
              </Typography>
              <Typography>
                273 Đ. An Dương Vương, Phường 3, Quận 5, Hồ Chí Minh
              </Typography>
            </Box>
            <Box
              sx={{
                width: "250px",
                height: "150px",
              }}
            >
              <Box
                component="img"
                src="https://corsairathletics.com/images/2023/8/8/IMG_1449_o98sJ.JPG"
                sx={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  borderRadius: "10px",
                  flex: 1,
                  objectFit: "cover",
                  marginLeft: "auto",
                }}
              />
            </Box>
          </Box>
          <Box>
            <Typography
              sx={{
                color: "var(--buttonHoverColor)",
              }}
              variant="h5"
            >
              Chi tiết
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "end",
                margin: "10px 0",
              }}
            >
              {/* <Typography>Chi phí</Typography> */}
              <Box>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "var(--buttonHoverColor)",
                  }}
                >
                  {formatDate(date)}
                </Typography>
                <Typography
                  sx={{
                    color: "var(--buttonHoverColor)",
                  }}
                >
                  {startTime} -{" "}
                  {(
                    Number(startTime.split(":")[0]) +
                    Number(duration.split(" ")[0])
                  ).toString() +
                    ":" +
                    startTime.split(":")[1]}
                </Typography>
              </Box>
              <Typography>20.000 đ / 1 tiếng</Typography>
            </Box>
            <Divider
              sx={{
                backgroundColor: "#e7e7e7",
                margin: "5px 0",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6">Tổng tiền</Typography>
              <Typography variant="h6">40.000 đ</Typography>
            </Box>
          </Box>
          <Box>
            <Button
              sx={{
                backgroundColor: "var(--buttonColor)",
                color: "white",
                ":hover": {
                  backgroundColor: "var(--buttonHoverColor)",
                },
                width: "100%",
              }}
              onClick={handlePayment}
            >
              Thanh toán Zalopay
            </Button>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default BookCourtPaymentPage;
