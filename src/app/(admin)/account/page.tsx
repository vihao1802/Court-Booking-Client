"use client";

import AdminTitle from "@/components/shared/AdminTitle";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowsProp,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { Box, Chip, Paper, Popover, Popper, Typography } from "@mui/material";
import React, { useEffect, useState, MouseEvent } from "react";
import { useGetUserList } from "@/hooks/user/useGetUserList";
import { InfoRounded, RemoveCircleOutlineRounded } from "@mui/icons-material";
import { User } from "@/models/user";
import UserInfo from "@/components/admin-user/UserInfo";
import { Pagination as ApiPagination } from "@/models/api";
import OvalLoader from "@/components/shared/OvalLoader";

const Account = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const [selectedRow, setSelectedRow] = useState<null | Partial<User>>(null);
  const userInfoHandleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const userInfohandleClose = () => {
    setAnchorEl(null);
  };

  const columns: GridColDef[] = [
    {
      field: "ordinalNumber",
      headerName: "#",
      width: 50,
    },
    {
      field: "userName",
      headerName: "Người dùng",
      width: 200,
      editable: false,
      sortable: false,
      renderCell: (item) => {
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
              padding: "10px 0",
            }}
          >
            <Box
              component="img"
              alt="profile"
              src="https://res.cloudinary.com/dxlnrizu7/image/upload/v1728888785/cld-sample-5.jpg"
              height="32px"
              width="32px"
              borderRadius="50%"
              sx={{ objectFit: "cover" }}
            />
            <Typography
              sx={{
                fontSize: "16px",
                color: "black",
                marginLeft: "10px",
                padding: "5px 0",
              }}
            >
              {item.value}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      editable: false,
      sortable: false,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 150,
      editable: false,
      sortable: false,
    },
    {
      field: "isDisabled",
      headerName: "Trạng thái",
      width: 150,
      editable: false,
      sortable: false,
      renderCell: (item) => {
        return (
          <Chip
            variant="outlined"
            color={item.value === 0 ? "success" : "error"}
            label={item.value === 0 ? "Đang hoạt động" : "Đã chặn"}
            size="small"
          />
        );
      },
    },
    {
      field: "action",
      headerName: "Thao tác",
      width: 150,
      sortable: false,
      type: "actions",
      getActions: (item) => {
        const detailElement = (
          <Box>
            <GridActionsCellItem
              icon={<InfoRounded sx={{ color: "#009265" }} />}
              label="Xem"
              className="textPrimary"
              color="inherit"
              onClick={(event: MouseEvent<HTMLButtonElement>) => {
                userInfoHandleClick(event);
                setSelectedRow(item.row);
              }}
            />
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={userInfohandleClose}
              anchorPosition={{
                top: window.innerHeight / 2,
                left: window.innerWidth / 2,
              }}
              anchorOrigin={{
                vertical: "center",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "center",
                horizontal: "center",
              }}
            >
              <UserInfo
                id={selectedRow?.id}
                userName={selectedRow?.userName}
                email={selectedRow?.email}
                phoneNumber={selectedRow?.phoneNumber}
                dayOfBirth={selectedRow?.dayOfBirth}
                createdAt={selectedRow?.createdAt}
                location={selectedRow?.location}
                isDisabled={selectedRow?.isDisabled}
                profileImage="https://res.cloudinary.com/dxlnrizu7/image/upload/v1728888785/cld-sample-5.jpg"
              />
            </Popover>
          </Box>
        );
        return item?.row.isDisabled === 0
          ? [
              detailElement,
              <GridActionsCellItem
                icon={<RemoveCircleOutlineRounded sx={{ color: "red" }} />}
                label="Chặn"
                color="inherit"
                onClick={() => {}}
              />,
            ]
          : [detailElement];
      },
    },
  ];

  const [filters, setFilters] = useState<ApiPagination>({
    page: 0,
    size: 5,
  });

  const [rows, setRows] = React.useState<GridRowsProp>([]);
  const { data: userData, isLoading: isUserDataLoading } =
    useGetUserList(filters);

  const rowCount = userData?.totalElements;

  useEffect(() => {
    const currentPage = filters.page;
    const pageSize = filters.size;

    const filterData = userData?.content.filter(
      (user: User) => user?.role.roleName === "USER"
    );

    const rowData = filterData?.map((user: User, index: number) => ({
      ...user,
      ordinalNumber: currentPage * pageSize + index + 1,
    }));

    setRows(rowData);
  }, [userData, isUserDataLoading, filters.page]);

  if (isUserDataLoading) return <OvalLoader />;

  console.log(userData);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "auto 0",
        padding: "30px 0",
      }}
    >
      <Box>
        <AdminTitle title="Account" subtitle="Manage your account" />
        <Box m="0 auto" width="1000px">
          <Paper>
            <Box
              mt="20px"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "2px solid #e7e7e7",
                  borderRadius: "7px",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "1px solid #e7e7e7",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "white",
                  color: "#009265",
                  borderBottom: "1px solid #e7e7e7",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: "white",
                },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: "white",
                  color: "black",
                  borderTop: "1px solid #e7e7e7",
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `#009265 !important`,
                },
                "& .MuiTablePagination-selectLabel": {
                  margin: "unset",
                },
                "& .MuiTablePagination-displayedRows": {
                  margin: "unset",
                },
                overflow: "unset",
              }}
            >
              <DataGrid
                loading={isUserDataLoading || !userData}
                rows={rows || []}
                getRowId={(row) => row.id}
                columns={columns}
                rowCount={rowCount}
                paginationMode="server"
                paginationModel={{
                  page: filters.page,
                  pageSize: filters.size,
                }}
                onPaginationModelChange={(model) => {
                  setFilters({ page: model.page, size: model.pageSize });
                  console.log(filters);
                }}
                initialState={{
                  pagination: { paginationModel: { pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10]}
                sx={{ padding: "10px 20px", height: "100%" }}
                keepNonExistentRowsSelected
              />
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Account;
