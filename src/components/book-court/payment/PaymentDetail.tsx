"use client";
import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Divider, StepLabel, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { formatDate } from "@/utils/date";
import { BookCourtContext } from "@/app/(user)/book-court/layout";
import {
  Avatar,
  List,
  ListItem,
  ListItemDecorator,
  Radio,
  RadioGroup,
  Sheet,
} from "@mui/joy";

const PaymentDetail = () => {
  const { date, startTime, duration } = useContext(BookCourtContext);
  const { id } = useParams();
  const router = useRouter();

  const [selectedPayment, setSelectedPayment] = useState(-1);
  const handlePayment = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/reservation/${id}/payment/zalo-pay`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            totalPrice: 10000,
            userName: "Vi Hao",
          }),
        }
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

  return (
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
            flexDirection: { xs: "column", md: "row" },
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
          <Typography
            sx={{
              color: "var(--buttonHoverColor)",
            }}
            variant="h5"
          >
            Phương thức thanh toán
          </Typography>
          <RadioGroup
            aria-label="Phương thức thanh toán"
            name="payment"
            defaultValue="Individual"
          >
            <List
              sx={{
                // minWidth: 240,
                // "--List-gap": "0.5rem",
                "--ListItem-paddingY": "10px",
                "--ListItem-radius": "8px",
                "--ListItemDecorator-size": "32px",
                margin: "10px 0 0",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "normal", sm: "center" },
                gap: "10px",
              }}
            >
              {["Ví ZaloPay", "Ví Momo"].map((item, index) => (
                <ListItem
                  variant="outlined"
                  key={item}
                  sx={{
                    boxShadow: "sm",
                    height: "80px",
                    flex: 1,
                  }}
                >
                  <ListItemDecorator>
                    {
                      [
                        <Box
                          sx={{
                            width: "70px",
                            height: "70px",
                            padding: "10px",
                            marginRight: "5px",
                          }}
                        >
                          <Box
                            component="img"
                            src="/icons/zalopay/Logo FA-11.png"
                            sx={{
                              padding: "5px",
                              height: "100%",
                            }}
                          />
                        </Box>,
                        <Box
                          sx={{
                            width: "70px",
                            height: "70px",
                            padding: "10px",
                            marginRight: "5px",
                          }}
                        >
                          <Box
                            component="img"
                            src="/icons/momo/momo_icon_square_pinkbg@5x.png"
                            sx={{
                              padding: "5px",
                              height: "100%",
                            }}
                          />
                        </Box>,
                      ][index]
                    }
                  </ListItemDecorator>
                  <Radio
                    overlay
                    value={index}
                    label={item}
                    sx={{
                      flexGrow: 1,
                      flexDirection: "row-reverse",
                    }}
                    onChange={() => setSelectedPayment(index)}
                    slotProps={{
                      action: ({ checked }) => ({
                        sx: (theme) => ({
                          ...(checked && {
                            inset: -1,
                            border: "2px solid",
                            borderColor: theme.vars.palette.primary[500],
                          }),
                        }),
                      }),
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </RadioGroup>
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
            disabled={selectedPayment === -1}
            onClick={handlePayment}
          >
            Thanh toán ngay
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentDetail;
