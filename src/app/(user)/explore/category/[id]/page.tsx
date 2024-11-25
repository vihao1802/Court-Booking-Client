"use client";

import { Box, Pagination, Paper, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { exploreCategoriesTabs } from "@/constants";
import { useParams, useSearchParams } from "next/navigation";
import CourtCard from "@/components/shared/CourtCard";
import { useGetCourtList } from "@/hooks/court/useGetCourtList";
import { AvailableCourtPagination } from "@/models/api";
import { Court } from "@/models/court";
import { useGetAvailableCourts } from "@/hooks/court/useGetAvailableCourts";
import TennisBallLoader from "@/components/shared/TennisBallLoader";

const page = () => {
  const { id: typeId } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  const [filters, setFilters] = useState<AvailableCourtPagination>({
    page: 0,
    size: 6,
    date: date,
    start: start,
    end: end,
  });

  const [courtData, setCourtData] = useState<Court[]>([]);

  const { data: courtsByType, isLoading: courtsByTypeLoading } =
    useGetCourtList({
      typeId: typeId,
      params: { page: filters.page, size: filters.size },
      enabled: !Boolean(date) && !Boolean(start) && !Boolean(end),
    });

  const { data: availableCourts, isLoading: availableCourtsLoading } =
    useGetAvailableCourts({
      typeId: typeId,
      params: filters,
      enabled: Boolean(date) && Boolean(start) && Boolean(end),
    });

  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    if (!availableCourtsLoading && availableCourts) {
      setCourtData(availableCourts.content);
      setPageNumber(availableCourts.pageable.pageNumber);
      setTotalPages(availableCourts.totalPages);
    }
  }, [availableCourtsLoading, availableCourts]);

  useEffect(() => {
    if (!courtsByTypeLoading && courtsByType) {
      setCourtData(courtsByType.content);
      setPageNumber(courtsByType.pageable.pageNumber);
      setTotalPages(courtsByType.totalPages);
    }
  }, [courtsByTypeLoading, courtsByType]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setFilters({
      ...filters,
      page: page - 1,
    });
  };

  if (courtsByTypeLoading || availableCourtsLoading)
    return <TennisBallLoader />;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        padding: "20px",
      }}
    >
      <Paper
        // elevation={0}
        sx={{
          height: "100%",
          width: "1056px",
          maxWidth: "100%",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        {courtsByType && (
          <Typography variant="h5" p="0 10px">
            {courtData[0]?.courtType?.courtTypeName}
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            padding: "10px",
            gap: 2,
          }}
        >
          {courtData?.map((court: Court, index: number) => (
            <CourtCard
              key={index}
              id={court?.id}
              name={court?.courtName}
              people={4}
              type={court?.courtType?.courtTypeName}
            />
          ))}
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
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default page;
