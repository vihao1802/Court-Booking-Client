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
  Avatar,
  Box,
  Button,
  Chip,
  Paper,
  Popover,
  Popper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, MouseEvent, useRef } from "react";
import {
  CancelRounded,
  CheckCircleRounded,
  CheckRounded,
  InfoRounded,
  RemoveCircleOutlineRounded,
} from "@mui/icons-material";
import { User } from "@/models/user";
import { ReservationPagination } from "@/models/api";
import OvalLoader from "@/components/shared/OvalLoader";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import toast from "react-hot-toast";
import { useGetReservations } from "@/hooks/reservation/useGetReservations";
import { Reservation } from "@/models/reservation";
import { PaymentMethod, ReservationState } from "@/types/enums";
import dayjs, { Dayjs } from "dayjs";
import { formatVND } from "@/utils/format";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ReservationInfo from "@/components/admin-booking/ReservationInfo";
import { useUpdateReservation } from "@/hooks/reservation/useUpdateReservation";

const BookingManagement = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const reservationInfoHandleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const reservationInfohandleClose = () => {
    setAnchorEl(null);
  };

  const [selectedRow, setSelectedRow] = useState<null | Partial<Reservation>>(
    null
  );

  const [confirmContent, setConfirmContent] = useState({
    title: "",
    content: "",
  });
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleClickOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const columns: GridColDef[] = [
    {
      field: "ordinalNumber",
      headerName: "#",
      width: 25,
    },
    {
      field: "userName",
      headerName: "Người dùng",
      width: 155,
      editable: false,
      sortable: false,
      renderCell: (item) => {
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "2px",
              // padding: "10px 0",
              padding: "5px 0",
            }}
          >
            {/* <Box
                component="img"
                alt="profile"
                src={item.row.user?.profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              /> */}

            <Avatar>{item.row.user?.userName?.charAt(0)}</Avatar>

            <Typography
              sx={{
                fontSize: "16px",
                color: "black",
                marginLeft: "10px",
                padding: "5px 0",
              }}
            >
              {item.row.user?.userName}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "phoneNumber",
      headerName: "Số điện thoại",
      width: 120,
      editable: false,
      sortable: false,
      renderCell: (item) => {
        return (
          <Typography padding="15px 0">{item.row.user?.phoneNumber}</Typography>
        );
      },
    },
    {
      field: "reservationDate",
      headerName: "Ngày đặt",
      width: 100,
      editable: false,
      sortable: false,
      renderCell: (item) => {
        return (
          <Typography padding="15px 0">
            {dayjs(item.row?.reservationDate).format("DD/MM/YYYY")}
          </Typography>
        );
      },
    },
    {
      field: "checkInOutTime",
      headerName: "Thời gian",
      width: 100,
      editable: false,
      sortable: false,
      renderCell: (item) => {
        return (
          <Typography padding="15px 0">
            {item.row?.checkInTime + " - " + item.row?.checkOutTime + " giờ"}
          </Typography>
        );
      },
    },
    {
      field: "paymentMethod",
      headerName: "PTTT",
      width: 100,
      editable: false,
      sortable: false,
    },
    {
      field: "totalPrice",
      headerName: "Tổng tiền",
      width: 100,
      editable: false,
      sortable: false,
      renderCell: (item) => {
        return formatVND(item.row.totalPrice);
      },
    },
    {
      field: "ReservationState",
      headerName: "Trạng thái",
      width: 100,
      editable: false,
      sortable: false,
      renderCell: (item) => {
        return (
          <Chip
            color={
              item.row?.reservationState === 0
                ? "warning"
                : item.row?.reservationState === 1
                ? "success"
                : "error"
            }
            label={ReservationState[item.row?.reservationState]}
            size="small"
          />
        );
      },
    },
    {
      field: "action",
      headerName: "Thao tác",
      width: 125,
      sortable: false,
      type: "actions",
      getActions: (item) => {
        const status = item.row?.reservationState;
        const paymentMethod = item.row?.paymentMethod;

        const details = (
          <>
            <Tooltip title="Xem chi tiết">
              <GridActionsCellItem
                icon={<InfoRounded />}
                label="Xem"
                className="textPrimary"
                color="primary"
                onClick={(event: MouseEvent<HTMLButtonElement>) => {
                  reservationInfoHandleClick(event);
                  setSelectedRow(item.row);
                }}
              />
            </Tooltip>
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={reservationInfohandleClose}
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
              {selectedRow && <ReservationInfo reservation={selectedRow} />}
            </Popover>
          </>
        );
        const accept = (
          <Tooltip title="Xác nhận thanh toán">
            <GridActionsCellItem
              icon={<CheckCircleRounded />}
              label="Xác nhận"
              color="success"
              onClick={() => {
                setIsAccept(true);
                setSelectedRow(item?.row);
                setConfirmContent({
                  title: "Xác nhận thanh toán",
                  content: "Bạn có chắc chắn muốn xác nhận thanh toán không?",
                });
                handleClickOpenConfirmDialog();
              }}
            />
          </Tooltip>
        );
        const cancel = (
          <Tooltip title="Hủy đơn đặt">
            <GridActionsCellItem
              icon={<CancelRounded />}
              label="Chặn"
              color="error"
              onClick={() => {
                setIsAccept(false);
                setSelectedRow(item?.row);
                setConfirmContent({
                  title: "Hủy đơn đặt",
                  content: "Bạn có chắc chắn muốn hủy đơn đặt này không?",
                });
                handleClickOpenConfirmDialog();
              }}
            />
          </Tooltip>
        );
        return status === 0 && paymentMethod === "CASH"
          ? [details, accept, cancel]
          : [details];
      },
    },
  ];

  const searchRef = useRef<HTMLInputElement>(null);
  const dateFormRef = useRef<HTMLInputElement>(null);
  const dateToRef = useRef<HTMLInputElement>(null);

  const [filters, setFilters] = useState<ReservationPagination>({
    search: "",
    page: 0,
    size: 10,
    from: dayjs().format("YYYY-MM-DD"),
    to: dayjs().format("YYYY-MM-DD"),
  });

  const [rows, setRows] = React.useState<GridRowsProp>([]);

  const { data: reservationData, isLoading: isReservationDataLoading } =
    useGetReservations({ params: filters });

  const rowCount = reservationData?.totalElements;

  const { updateReservation } = useUpdateReservation({});

  const [isAccept, setIsAccept] = useState(false);
  const handleUpdateReservation = async (
    id: string,
    state: ReservationState,
    method: PaymentMethod
  ) => {
    try {
      await updateReservation(id, {
        reservationState: state,
        paymentMethod: method,
      });
      toast.success("Thao tác thành công");
    } catch (error) {
      toast.error("Update failed:" + error);
    } finally {
      handleCloseConfirmDialog();
      window.location.reload();
    }
  };

  useEffect(() => {
    const currentPage = filters.page;
    const pageSize = filters.size;

    const rowData = reservationData?.content?.map(
      (reservation: Reservation, index: number) => ({
        ...reservation,
        ordinalNumber: currentPage * pageSize + index + 1,
      })
    );

    setRows(rowData);
  }, [reservationData, isReservationDataLoading, filters.page]);

  const handleSearch = () => {
    const dateFrom = dateFormRef.current?.value
      ? dayjs(dateFormRef.current?.value).format("YYYY-MM-DD")
      : dayjs().format("YYYY-MM-DD");

    const dateTo = dateToRef.current?.value
      ? dayjs(dateToRef.current?.value).format("YYYY-MM-DD")
      : dayjs().format("YYYY-MM-DD");

    if (dateFrom > dateTo) {
      toast.error("Ngày bắt đầu không thể lớn hơn ngày kết thúc");
      return;
    }

    setFilters({
      ...filters,
      search: searchRef.current?.value || "",
      from: dateFrom,
      to: dateTo,
    });
  };

  if (isReservationDataLoading) return <OvalLoader />;

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
        <AdminTitle title="Quản lý đặt sân" subtitle="Danh sách lịch đặt sân" />
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
                keepNonExistentRowsSelected
                loading={isReservationDataLoading || !reservationData}
                rows={rows || []}
                getRowId={(row) => row.id}
                columns={columns || []}
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
                }}
                initialState={{
                  pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[10, 5]}
                sx={{ padding: "10px 20px", height: "100%" }}
                slots={{
                  toolbar: () => {
                    return (
                      <GridToolbarContainer>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            label="Tìm kiếm"
                            variant="outlined"
                            size="small"
                            color="success"
                            sx={{ width: "300px" }}
                            inputRef={searchRef}
                          />
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              inputRef={dateFormRef}
                              label="Từ ngày"
                              slotProps={{
                                textField: { size: "small", color: "success" },
                              }}
                            />
                            <DatePicker
                              inputRef={dateToRef}
                              label="Đến ngày"
                              slotProps={{
                                textField: { size: "small", color: "success" },
                              }}
                            />
                          </LocalizationProvider>
                          <Button
                            color="success"
                            variant="contained"
                            onClick={handleSearch}
                          >
                            Tìm kiếm
                          </Button>
                        </Box>
                      </GridToolbarContainer>
                    );
                  },
                }}
              />
            </Box>
          </Paper>
        </Box>
      </Box>

      <ConfirmDialog
        title={confirmContent.title}
        content={confirmContent.content}
        open={openConfirmDialog}
        handleConfirm={() => {
          if (selectedRow?.id) {
            handleUpdateReservation(
              selectedRow.id,
              isAccept ? ReservationState.SUCCESS : ReservationState.FAILED,
              selectedRow.paymentMethod || PaymentMethod.NO
            );
          } else {
            toast.error("Selected row ID is undefined");
          }
        }}
        handleClose={handleCloseConfirmDialog}
      />
    </Box>
  );
};

export default BookingManagement;
