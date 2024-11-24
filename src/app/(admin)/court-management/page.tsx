"use client";

import AdminTitle from "@/components/shared/AdminTitle";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowsProp,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import {
  Box,
  Button,
  Chip,
  MenuItem,
  Paper,
  Popover,
  Popper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AddRounded, DeleteRounded, EditRounded } from "@mui/icons-material";
import { User } from "@/models/user";
import { Pagination as ApiPagination } from "@/models/api";
import OvalLoader from "@/components/shared/OvalLoader";
import { useGetCourtTypeList } from "@/hooks/court-type/useGetCourtTypeList";
import { useGetCourtList } from "@/hooks/court/useGetCourtList";
import { CourtType } from "@/models/court-type";
import { formatVND } from "@/utils/format";
import CourtForm from "@/components/admin-court/CourtForm";
import { usePutDeleteCourt } from "@/hooks/court/usePutDeleteCourt";
import toast from "react-hot-toast";
import ConfirmDialog from "@/components/shared/ConfirmDialog";

const CourtManagement = () => {
  // court list
  const [selectedCourtId, setSelectedCourtId] = useState<string | null>(null);

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const handleClickOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };
  const handleConfirm = async () => {
    if (selectedCourtId) {
      await deleteCourt(selectedCourtId);
    }
    setOpenConfirmDialog(false);
    toast.success("Xóa thành công");
  };
  const [confirmContent, setConfirmContent] = useState({
    title: "",
    content: "",
  });

  const deleteCourt = usePutDeleteCourt();
  const columns: GridColDef[] = [
    {
      field: "ordinalNumber",
      headerName: "#",
      width: 50,
    },
    {
      field: "courtName",
      headerName: "Tên sân",
      width: 200,
      editable: false,
      sortable: false,
    },
    {
      field: "rentalTime",
      headerName: "Thời gian thuê",
      width: 200,
      editable: false,
      sortable: false,
      renderCell(params) {
        return (
          <Typography p="12px">
            {params.row.minimumRentalTime} - {params.row.maximumRentalTime} giờ
          </Typography>
        );
      },
    },
    {
      field: "rentalPricePerHour",
      headerName: "Đơn giá",
      width: 200,
      editable: false,
      sortable: false,
      renderCell(params) {
        return (
          <Typography p="12px">
            {formatVND(params.row.rentalPricePerHour)}
          </Typography>
        );
      },
    },
    {
      field: "courtType",
      headerName: "Loại sân",
      width: 100,
      editable: false,
      sortable: false,
      renderCell: (item) => {
        return (
          <Chip
            variant="outlined"
            color="success"
            label={item.row.courtType?.courtTypeName}
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
        return [
          <GridActionsCellItem
            icon={<EditRounded sx={{ color: "#009265" }} />}
            label="Sửa"
            className="textPrimary"
            color="inherit"
            onClick={() => {
              setSelectedCourtId(item.row.id);
              setOpenCourtForm(true);
            }}
          />,
          <GridActionsCellItem
            icon={<DeleteRounded sx={{ color: "red" }} />}
            label="Xóa"
            color="inherit"
            onClick={async () => {
              setSelectedCourtId(item.row.id);
              setConfirmContent({
                title: "Xác nhận xóa sân",
                content: "Bạn có chắc chắn muốn xóa sân này không?",
              });
              handleClickOpenConfirmDialog();
            }}
          />,
        ];
      },
    },
  ];

  const [filters, setFilters] = useState<ApiPagination>({
    search: "",
    page: 0,
    size: 10,
  });

  const [rows, setRows] = React.useState<GridRowsProp>([]);

  const { data: courtTypeData, isLoading: courtTypeDataLoading } =
    useGetCourtTypeList({ isdisabled: 0 });

  const [selectedType, setSelectedType] = useState("");

  const { data: courtData, isLoading: courtDataLoading } = useGetCourtList({
    typeId: selectedType,
    params: filters,
    enabled: Boolean(selectedType),
  });

  const rowCount = courtData?.totalElements;

  // court add
  const [openCourtForm, setOpenCourtForm] = useState(false);

  const handleClickOpenCourtForm = (courtId?: string) => {
    setSelectedCourtId(courtId || null);
    setOpenCourtForm(true);
  };

  const handleCloseCourtForm = () => {
    setSelectedCourtId(null);
    setOpenCourtForm(false);
  };

  // functions
  useEffect(() => {
    if (courtTypeData || !courtTypeDataLoading)
      setSelectedType(courtTypeData?.[0]?.id);
  }, [courtTypeData]);

  useEffect(() => {
    const currentPage = filters.page;
    const pageSize = filters.size;

    const rowData = courtData?.content.map((user: User, index: number) => ({
      ...user,
      ordinalNumber: currentPage * pageSize + index + 1,
    }));

    setRows(rowData);
  }, [courtData, courtDataLoading, filters.page]);

  if (courtDataLoading || courtTypeDataLoading) return <OvalLoader />;

  const courtTypeHandleChange = (event: SelectChangeEvent) => {
    setSelectedType(event.target.value);
  };

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
        <AdminTitle title="Quản lý sân" subtitle="Danh sách sân" />
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
                loading={courtDataLoading || !courtData}
                rows={rows || []}
                getRowId={(row) => row.id}
                columns={columns}
                slots={{
                  toolbar: () => {
                    return (
                      <GridToolbarContainer>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "10px",
                            }}
                          >
                            <Typography fontSize="14px" p="10px 0">
                              Lọc theo loại sân:
                            </Typography>
                            <Select
                              value={selectedType}
                              onChange={courtTypeHandleChange}
                              size="small"
                            >
                              {courtTypeData?.map((type: CourtType) => (
                                <MenuItem key={type.id} value={type.id}>
                                  {type.courtTypeName}
                                </MenuItem>
                              ))}
                            </Select>
                          </Box>

                          <Button
                            color="primary"
                            startIcon={<AddRounded />}
                            onClick={() => handleClickOpenCourtForm()}
                          >
                            Thêm mới
                          </Button>
                        </Box>
                      </GridToolbarContainer>
                    );
                  },
                }}
                rowCount={rowCount}
                paginationMode="server"
                paginationModel={{
                  page: filters.page,
                  pageSize: filters.size,
                }}
                onPaginationModelChange={(model) => {
                  setFilters({
                    ...filters,
                    page: model.page,
                    size: model.pageSize,
                  });
                  console.log(filters);
                }}
                initialState={{
                  pagination: { paginationModel: { pageSize: 5 } },
                }}
                pageSizeOptions={[10, 5]}
                sx={{ padding: "10px 20px", height: "100%" }}
                keepNonExistentRowsSelected
              />
            </Box>
          </Paper>
        </Box>
      </Box>

      <CourtForm
        courtId={selectedCourtId}
        open={openCourtForm}
        handleClose={handleCloseCourtForm}
      />
      <ConfirmDialog
        title={confirmContent.title}
        content={confirmContent.content}
        open={openConfirmDialog}
        handleConfirm={handleConfirm}
        handleClose={handleCloseConfirmDialog}
      />
    </Box>
  );
};

export default CourtManagement;
