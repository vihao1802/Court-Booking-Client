"use client";

import { TabContext, TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  Pagination,
  Paper,
  Tab,
  Tabs,
  Typography,
  Skeleton,
} from "@mui/material";
import React, { SyntheticEvent, useEffect, useState } from "react";
import CourtCard from "@/components/shared/CourtCard";
import { exploreCategoriesTabs } from "@/constants";
import { useRouter } from "next/navigation";
import { useGetCourtList } from "@/hooks/court/useGetCourtList";
import { PaginationBase as ApiPagination } from "@/models/api";
import { useGetCourtTypeList } from "@/hooks/court-type/useGetCourtTypeList";
import { Court } from "@/models/court";
import TennisBallLoader from "./TennisBallLoader";

const FeaturedCourts = () => {
  const router = useRouter();

  const [filters, setFilters] = useState<ApiPagination>({
    page: 0,
    size: 6,
  });

  const { data: courtTypeData, isLoading: courtTypeDataLoading } =
    useGetCourtTypeList({ isdisabled: 0 });

  const [selectedType, setSelectedType] = useState("");

  const { data: courtData, isLoading: courtDataLoading } = useGetCourtList({
    typeId: selectedType,
    params: filters,
    enabled: Boolean(selectedType),
  });

  const { pageNumber, pageSize } = courtData?.pageable || {};
  const totalPages = courtData?.totalPages;

  useEffect(() => {
    if (courtTypeData || !courtTypeDataLoading)
      setSelectedType(courtTypeData?.[0]?.id);
  }, [courtTypeData, courtTypeDataLoading]);

  const handleChange = (event: SyntheticEvent, newid: string) => {
    setSelectedType(newid);
  };

  if (courtTypeDataLoading || courtDataLoading) return <TennisBallLoader />;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setFilters({
      ...filters,
      page: page - 1,
    });
  };

  if (courtDataLoading || courtTypeDataLoading)
    return (
      <Skeleton
        animation="wave"
        variant="rectangular"
        width={1056}
        height={1000}
      />
    );

  return (
    <Paper
      elevation={3}
      sx={{
        minHeight: "1000px",
        height: "100%",
        width: "100%",
        maxWidth: "1056px",
        margin: "0 auto",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography variant="h5" fontWeight="bold">
          Sân nổi bật
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TabContext value={selectedType || courtTypeData[0]?.id}>
            <Box>
              <Tabs
                value={selectedType || courtTypeData[0]?.id}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  color: "#009265",
                  "& .MuiTab-root.Mui-selected": {
                    color: "#009265",
                  },
                  "& .MuiButtonBase-root": {
                    gap: 1,
                  },
                }}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#009265",
                  },
                }}
              >
                {courtTypeDataLoading ? (
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    width={500}
                    height={50}
                  />
                ) : (
                  courtTypeData?.map((type: any, index: number) => (
                    <Tab
                      icon={
                        exploreCategoriesTabs.find(
                          (x) => x.value === type?.id.split("-")[1]
                        )?.icon
                      }
                      label={type?.courtTypeName}
                      value={type?.id}
                      key={index}
                    />
                  ))
                )}
              </Tabs>
            </Box>

            <TabPanel
              value={selectedType}
              sx={{
                display: "flex",
                flexWrap: "wrap",
                padding: "10px",
                gap: 2,
              }}
            >
              {courtDataLoading
                ? Array.from(new Array(6)).map(() => (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        width={300}
                        height={200}
                      />
                      <Skeleton animation="wave" width="70%" height={30} />
                      <Skeleton animation="wave" width="60%" />
                      <Skeleton animation="wave" width="60%" />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Skeleton animation="wave" width="45%" height={60} />
                        <Skeleton animation="wave" width="45%" height={60} />
                      </Box>
                    </Box>
                  ))
                : courtData?.content.map((court: Court, index: number) => (
                    <CourtCard
                      key={index}
                      court={court}
                    />
                  ))}
            </TabPanel>
          </TabContext>
        </Box>
      </Box>

      {!courtTypeDataLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Pagination
            count={totalPages}
            page={pageNumber + 1}
            variant="outlined"
            onChange={handlePageChange}
          />
        </Box>
      )}
    </Paper>
  );
};

export default FeaturedCourts;
