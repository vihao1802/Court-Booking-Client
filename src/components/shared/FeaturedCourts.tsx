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
import { useCourtList } from "@/hooks/useCourtList";
import { Pagination as ApiPagination } from "@/models/api";
import { useCourtTypeList } from "@/hooks/useCourtTypeList";

const FeaturedCourts = () => {
  const router = useRouter();

  const [filters, setFilters] = useState<Partial<ApiPagination>>({
    page: 0,
    size: 6,
  });

  const { data: courtTypeData, isLoading: courtTypeDataLoading } =
    useCourtTypeList({ isdisabled: 0 });

  const [selectedType, setSelectedType] = useState("");

  const { data: courtData, isLoading: courtDataLoading } = useCourtList({
    typeId: selectedType,
    params: filters,
    enabled: Boolean(selectedType),
  });

  const { pageNumber, pageSize } = courtData?.pageable || {};
  const totalPages = courtData?.totalPages;

  useEffect(() => {
    if (courtTypeData || !courtTypeDataLoading)
      setSelectedType(courtTypeData?.[0]?.id);
  }, [courtTypeData]);

  const handleChange = (event: SyntheticEvent, newid: string) => {
    setSelectedType(newid);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setFilters({
      ...filters,
      page: page - 1,
    });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        height: "100%",
        width: "1056px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
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
        <TabContext value={selectedType}>
          <Box>
            <Tabs
              value={selectedType}
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
            {courtDataLoading ? (
              <Skeleton
                animation="wave"
                variant="rounded"
                width={700}
                height={1000}
              />
            ) : (
              courtData?.content.map(
                (
                  court: { id: string; courtName: string },
                  index: React.Key | null | undefined
                ) => (
                  <CourtCard
                    key={index}
                    id={court?.id}
                    name={court?.courtName}
                    people={4}
                    type={"Cầu lông"}
                  />
                )
              )
            )}
          </TabPanel>
        </TabContext>
      </Box>
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
          sx={{
            "& .MuiPaginationItem-root": {
              color: "var(--buttonColor)",
            },
            "& .Mui-selected": {
              color: "#fff",
              backgroundColor: "var(--buttonColor)",
            },
            "& .MuiPaginationItem-root:hover": {
              backgroundColor: "var(--buttonLightColor)",
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default FeaturedCourts;
