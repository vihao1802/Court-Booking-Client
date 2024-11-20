import { Box, Button, Divider, Typography } from "@mui/material";
import { Tune, ArrowForward } from "@mui/icons-material";
import React from "react";
import { useGetMyReservation } from "@/hooks/reservation/useGetMyReservation";

const MyBooking = () => {
  const { reservationList, isLoading, error, mutate } = useGetMyReservation();

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        padding: "1rem",
        backgroundColor: "white",
        borderRadius: "8px",
      }}
    >
      {/* header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1rem  ",
          marginBottom: "1rem",
        }}
      >
        <Button
          variant="outlined"
          sx={{
            display: "flex",
            height: "28px", // 7 * 4px (Tailwind's spacing scale)
            width: "max-content", // equivalent to w-max
            cursor: "pointer",
            alignItems: "center", // items-center
            borderRadius: "8px", // rounded-lg (lg is 8px)
            border: "1px solid rgb(67 97 238)",
            paddingX: "12px", // px-3 (3 * 4px = 12px)
            paddingY: "4px", // py-1 (1 * 4px = 4px)
            transition: "all 0.2s", // transition-all
            borderColor: "", // border-primary
            backgroundColor: "rgb(235 238 253)", // bg-primary-50
            color: "rgb(0 37 140)", // text-primary-700
          }}
        >
          Sắp tới
        </Button>
        <Button
          variant="outlined"
          sx={{
            display: "flex",
            height: "28px", // 7 * 4px (Tailwind's spacing scale)
            width: "max-content", // equivalent to w-max
            cursor: "pointer",
            alignItems: "center", // items-center
            borderRadius: "8px", // rounded-lg (lg is 8px)
            border: "1px solid rgb(67 97 238)",
            paddingX: "12px", // px-3 (3 * 4px = 12px)
            paddingY: "4px", // py-1 (1 * 4px = 4px)
            transition: "all 0.2s", // transition-all
            borderColor: "", // border-primary
            backgroundColor: "rgb(235 238 253)", // bg-primary-50
            color: "rgb(0 37 140)", // text-primary-700
          }}
        >
          Quá khứ
        </Button>
      </Box>
      {/* body */}
      <Box
        sx={{
          width: "100%",
        }}
      >
        {/* body-header */}
        <Box
          sx={{
            height: "3rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "gray",
            }}
          >
            10 bookings
          </Typography>
          <Button variant="outlined" startIcon={<Tune />}>
            Filter
          </Button>
        </Box>
        {/* body-body */}
        <Box>
          {/* body-component */}
          <Box>
            <Divider
              textAlign="left"
              sx={{
                width: "100%",
                fontWeight: "200",
                color: "rgb(109, 105, 123)",
                marginBottom: "1rem",
              }}
            >
              Oct 2024
            </Divider>
            {/* component-body */}
            <Box
              sx={{
                height: "110px",
                display: "flex",
                flexDirection: "row",
                // alignItems: "cen ter",
                justifyContent: "space-between",
                border: "1px solid rgb(235 238 253)",
                borderRadius: "8px",
                padding: "1rem",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  flex: "1",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                    }}
                  >
                    Mon
                  </Typography>
                  <Typography
                    sx={{
                      color: "rgb(67 97 238)",
                      fontWeight: "700",
                      fontSize: "2rem",
                    }}
                  >
                    21
                  </Typography>
                  <Typography>Oct</Typography>
                </Box>
                <Divider
                  sx={{ display: "flex", justifyContent: "center" }}
                  orientation="vertical"
                  flexItem
                ></Divider>
              </Box>

              <Box
                sx={{
                  flex: "3",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      fontSize: "0.6rem",
                      border: "0.5px solid", // 'border-0.5' and 'border-solid'
                      borderColor: "destructive.main", // 'border-destructive-600'
                      borderRadius: "4px", // 'rounded'
                      paddingX: "4px", // 'px-1' translates to 4px horizontal padding
                      paddingY: "2px", // 'py-0.5' translates to 2px vertical padding
                      fontWeight: "bold", // 'font-bold'
                      textTransform: "uppercase", // 'uppercase'
                      backgroundColor: "red", // 'bg-destructive-600'
                      color: "white",
                    }}
                  >
                    Pending
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      fontSize: "0.6rem",
                      border: "0.5px solid", // 'border-0.5' and 'border-solid'
                      borderColor: "destructive.main", // 'border-destructive-600'
                      borderRadius: "4px", // 'rounded'
                      paddingX: "4px", // 'px-1' translates to 4px horizontal padding
                      paddingY: "2px", // 'py-0.5' translates to 2px vertical padding
                      fontWeight: "bold", // 'font-bold'
                      textTransform: "uppercase", // 'uppercase'
                      backgroundColor: "red", // 'bg-destructive-600'
                      color: "white",
                    }}
                  >
                    Pending
                  </Button>
                </Box>
                <Typography variant="body1" sx={{ fontWeight: "700" }}>
                  Club 360 @ Setia Ecohill
                </Typography>
              </Box>
              <Box
                sx={{
                  height: "100%",
                  flex: "3",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "0.5rem",
                }}
              >
                <Typography variant="body2">21 Oct 2024, Monday</Typography>
                <Typography variant="body2">09:00AM - 11:00AM</Typography>
                <Button variant="text" endIcon={<ArrowForward />}>
                  View Detail
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MyBooking;
