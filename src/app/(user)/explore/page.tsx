"use client";

import { Autocomplete, Box, Paper, TextField, Typography } from "@mui/material";
import { exploreCategoriesTabs as types } from "@/constants";
import Image, { StaticImageData } from "next/image";
import React from "react";

import SearchPanel from "@/components/search-panel/SearchPanel";
import { useGetCourtTypeList } from "@/hooks/court-type/useGetCourtTypeList";
import { CourtType } from "@/models/court-type";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const { data: courtTypeList, isLoading: courtTypeListLoading } =
    useGetCourtTypeList({ isdisabled: 0 });

  if (courtTypeListLoading) return;

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 120px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SearchPanel />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            height: "100%",
            width: "1056px",
            margin: "0 auto",
            padding: "20px",
          }}
        >
          <Autocomplete
            disablePortal
            options={types}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tìm kiếm"
                size="small"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#E0E3E7",
                    },
                    "&:hover fieldset": {
                      borderColor: "#B2BAC2",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#6F7E8C",
                    },
                  },
                  "& label.Mui-focused": {
                    color: "#A0AAB4",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "#B2BAC2",
                  },
                }}
              />
            )}
          />

          <Box
            sx={{
              paddingTop: "20px",
            }}
          >
            <Typography variant="body1" fontWeight="bold">
              Thể thao quần vợt
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                padding: "20px 0",
                gap: "20px",
              }}
            >
              {courtTypeList
                .filter((court: CourtType) =>
                  types.some(
                    (type) =>
                      type.value === court.id.split("-")[1] && type.type === 1
                  )
                )
                .map((court: CourtType, index: number) => (
                  <Paper
                    key={index}
                    sx={{
                      position: "relative",
                      width: "100px",
                      height: "100px",
                      padding: "10px",
                      backgroundColor: "rgba(46, 125, 50, .2)",
                      cursor: "pointer",
                      "&:hover": {
                        border: "1px solid var(--buttonColor)",
                      },
                      border: "1px solid white",
                    }}
                    onClick={() => router.push(`/explore/category/${court.id}`)}
                  >
                    <Typography fontSize="13px" color="#222222">
                      {court.courtTypeName}
                    </Typography>
                    <Image
                      src={
                        types.find((x) => x.value === court?.id.split("-")[1])
                          ?.img as StaticImageData
                      }
                      alt={court.courtTypeName}
                      width={100}
                      height={100}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
                    />
                  </Paper>
                ))}
            </Box>
          </Box>

          <Box
            sx={{
              paddingTop: "20px",
            }}
          >
            <Typography variant="body1" fontWeight="bold">
              Thể thao đồng đội
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                padding: "20px 0",
              }}
            >
              {courtTypeList
                .filter((court: CourtType) =>
                  types.some(
                    (type) =>
                      type.value === court.id.split("-")[1] && type.type === 2
                  )
                )
                .map((court: any, index: number) => (
                  <Paper
                    key={index}
                    sx={{
                      position: "relative",
                      width: "100px",
                      height: "100px",
                      padding: "10px",
                      backgroundColor: "rgba(46, 125, 50, .2)",
                      cursor: "pointer",
                      "&:hover": {
                        border: "1px solid var(--buttonColor)",
                      },
                      border: "1px solid white",
                    }}
                    onClick={() => router.push(`/explore/category/${court.id}`)}
                  >
                    <Typography fontSize="13px" color="#222222">
                      {court.courtTypeName}
                    </Typography>
                    <Image
                      src={
                        types.find((x) => x.value === court?.id.split("-")[1])
                          ?.img as StaticImageData
                      }
                      alt={court.courtTypeName}
                      width={100}
                      height={100}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
                    />
                  </Paper>
                ))}
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default page;
