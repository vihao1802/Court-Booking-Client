"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Divider, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { formatDate, formatVND } from "@/utils/format";
import { List, ListItem, ListItemDecorator, Radio, RadioGroup } from "@mui/joy";
import { reservationApi } from "@/api/reservation";
import OvalLoader from "@/components/shared/OvalLoader";
import toast from "react-hot-toast";
import Countdown from "@/components/shared/CountDown";
import { useGetReservationById } from "@/hooks/reservation/useGetReservationById";
import { useUpdateReservation } from "@/hooks/reservation/useUpdateReservation";
import { PaymentMethod } from "@/types/enums";

const PaymentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(-1);
  const router = useRouter();
  const {
    data: reservation,
    error,
    isLoading,
  } = useGetReservationById({
    reservationId: id,
  });
  const { updateReservation } = useUpdateReservation({});

  if (isLoading) {
    return <OvalLoader size="50" />;
  }

  if (error) {
    return <OvalLoader size="50" />;
  }

  const handlePayment = async () => {
    setLoadingPayment(true);
    try {
      let res;
      let res_status = 1;
      if (selectedPayment === 0) {
        res = await reservationApi.createPaymentZaloPay(id);
        if (res.status === 200) {
          router.push(res.data.order_url);
        } else {
          toast.error(
            res.data.return_message + " " + res.data.sub_return_message
          );
        }
        console.log(res);
      } else if (selectedPayment === 1) {
        res = await reservationApi.createPaymentMomo(id, {
          requestType: "payWithCC",
        });

        console.log(res);

        router.push(res.payUrl);
      }
    } catch (error) {
      console.log("handlePayment: " + error);
    } finally {
      setLoadingPayment(false);
    }
  };

  const handleTimeOutPayment = () => {
    updateReservation(id, {
      reservationState: 2,
      paymentMethod: "NONE" as PaymentMethod,
    });
    toast.error("Hết thời hạn thanh toán. Đơn đặt đã bị hủy.");
    // router.push(`/`);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        <Typography
          sx={{
            color: "gray",
          }}
          variant="h6"
        >
          Đơn đặt sẽ hết hạn trong
        </Typography>
        <Countdown onComplete={handleTimeOutPayment} />
      </Box>
      <Box
        sx={{
          maxWidth: "600px",
          width: "100%",
          padding: { xs: "5px", md: "20px" },
          display: "flex",
          flexDirection: "column",
          "& > * + *": {
            marginTop: "20px",
          },
          borderRadius: "7px",
          boxShadow: { sm: "none", md: "rgba(0, 0, 0, 0.2) 0px 0px 4px" },
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
                color: "var(--buttonHoverColor)",
              }}
              variant="h5"
            >
              Sân Tennis A
            </Typography>
            <Typography
              sx={{
                color: "var(--buttonColor)",
              }}
            >
              Tennis
            </Typography>
            <Typography>
              273 Đ. An Dương Vương, Phường 3, Quận 5, Hồ Chí Minh
            </Typography>
          </Box>
          <Box
            sx={{
              width: { md: "250px", xs: "100%" },
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
                  color: "var(--buttonColor)",
                }}
              >
                {formatDate(reservation?.reservationDate)}
              </Typography>
              <Typography
                sx={{
                  color: "var(--buttonColor)",
                }}
              >
                {reservation.checkInTime} - {reservation.checkOutTime}
              </Typography>
            </Box>
            <Typography sx={{ textAlign: "right" }}>
              20.000 đ / 1 tiếng
            </Typography>
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
            <Typography variant="h6" sx={{ textAlign: "right" }}>
              {formatVND(Number(reservation.totalPrice))}
            </Typography>
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
              ":disabled": {
                backgroundColor: "gray",
              },
              width: "100%",
            }}
            disabled={selectedPayment === -1 || loadingPayment}
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
