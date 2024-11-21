"use client";
import React, { Fragment, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Alert, Button, Divider, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { formatDate, formatVND } from "@/utils/format";
import { List, ListItem, ListItemDecorator, Radio, RadioGroup } from "@mui/joy";
import { reservationApi } from "@/api/reservation";
import OvalLoader from "@/components/shared/OvalLoader";
import toast from "react-hot-toast";
import Countdown from "@/components/shared/CountDown";
import { useGetReservationById } from "@/hooks/reservation/useGetReservationById";
import { useUpdateReservation } from "@/hooks/reservation/useUpdateReservation";
import { PaymentMethod, ReservationState } from "@/types/enums";
import { CalendarToday } from "@mui/icons-material";

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

  useEffect(() => {
    if (!isLoading) {
      if (!reservation) {
        toast.error("Đơn đặt không tồn tại.");
        router.push(`/`);
      }
    }
  }, [reservation, isLoading]);

  if (isLoading || !reservation) {
    return <OvalLoader size="50" />;
  }

  if (error) {
    console.log(error);
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

  const handleTimeOutPayment = async () => {
    try {
      await updateReservation(id, {
        reservationState: ReservationState.FAILED,
        paymentMethod: PaymentMethod.NO,
      });
      toast.error("Hết thời hạn thanh toán. Đơn đặt đã bị hủy.");
      window.location.reload();
    } catch (error) {
      console.log("handleTimeOutPayment: " + error);
    }
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
      {reservation.reservationState === ReservationState.PENDING && (
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
      )}

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
        {reservation.reservationState === ReservationState.FAILED && (
          <Alert severity="error">Đơn đặt đã bị hủy</Alert>
        )}
        {reservation.reservationState === ReservationState.SUCCESS && (
          <Alert severity="success">Đơn đặt thành công</Alert>
        )}
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
              {reservation.court.courtName}
            </Typography>
            <Typography
              sx={{
                color: "var(--buttonColor)",
              }}
            >
              {reservation.court.courtType.courtTypeName}
            </Typography>
            <Typography>{reservation.court.courtAddress}</Typography>
          </Box>
          <Box
            sx={{
              width: { md: "250px", xs: "100%" },
            }}
          >
            <Box
              component="img"
              src={
                reservation.court.courtImageList.find(
                  (img) => img.imageType === "main"
                )?.courtImageSrc
              }
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                {reservation.reservationState === ReservationState.FAILED && (
                  <CalendarToday fontSize="small" />
                )}
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "var(--buttonColor)",
                    textDecoration: "none",
                    ...(reservation.reservationState ===
                      ReservationState.FAILED && {
                      fontSize: "18px",
                      color: "#48445A",
                      textDecoration: "line-through",
                    }),
                  }}
                >
                  {formatDate(reservation.reservationDate)}
                </Typography>
              </Box>

              <Typography
                sx={{
                  color: "var(--buttonColor)",
                }}
              >
                {reservation.checkInTime}:00 - {reservation.checkOutTime}:00
              </Typography>
            </Box>
            <Typography sx={{ textAlign: "right" }}>
              {formatVND(Number(reservation.court.rentalPricePerHour))}/ 1 tiếng
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
            <Typography
              variant="h6"
              sx={{
                textAlign: "right",
                ...(reservation.reservationState ===
                  ReservationState.FAILED && {
                  color: "#48445A",
                  textDecoration: "line-through",
                }),
              }}
            >
              {formatVND(Number(reservation.totalPrice))}
            </Typography>
          </Box>
        </Box>

        {reservation?.reservationState === ReservationState.PENDING && (
          <Fragment>
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
          </Fragment>
        )}
      </Box>
    </Box>
  );
};

export default PaymentDetail;
