"use client";

import { Box, Pagination, Paper, Skeleton, Typography } from "@mui/material";
import React, { useState } from "react";
import { exploreCategoriesTabs } from "@/constants";
import { useParams } from "next/navigation";
import CourtCard from "@/components/shared/CourtCard";
import { useGetCourtList } from "@/hooks/court/useGetCourtList";
import { Pagination as ApiPagination } from "@/models/api";
import { Court } from "@/models/court";

const page = () => {
  const { id: typeId } = useParams<{ id: string }>();
  const [filters, setFilters] = useState<Partial<ApiPagination>>({
    page: 0,
    size: 6,
  });

  const { data: courtData, isLoading: courtDataLoading } = useGetCourtList({
    typeId: typeId,
    params: filters,
    enabled: Boolean(typeId),
  });

  const { pageNumber, pageSize } = courtData?.pageable || {};
  const totalPages = courtData?.totalPages;

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
        <Typography variant="h5" p="0 10px">
          {courtData?.content[0]?.courtType?.courtTypeName}
        </Typography>
        <Box
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
            courtData?.content.map((court: Court, index: number) => (
              <CourtCard
                key={index}
                id={court?.id}
                name={court?.courtName}
                people={4}
                type={court?.courtType?.courtTypeName}
              />
            ))
          )}
        </Box>

        {!courtDataLoading && (
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
    </Box>
  );
};

export default page;
