import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import RefreshIcon from "@mui/icons-material/Refresh";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import type { SxProps } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ArrowRight as ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import dayjs from "dayjs";
import { DashboardContext } from "@/context/dash-board-context";
import { Link } from "@mui/material";
import { UseGetLatestReservation } from "@/hooks/reservation/useGetLatestReservation";
import { Skeleton } from "@mui/joy";
import { Reservation } from "@/models/reservation";
import TableSkeleton from "./skeleton/TableSkeleton";
import OvalLoader from "../shared/OvalLoader";

const statusMap = {
  0: { label: "Đang chờ", color: "warning" },
  1: { label: "Đã xác nhận", color: "success" },
  2: { label: "Đã hủy", color: "error" },
} as const;

export interface Order {
  id: string;
  customer: { name: string };
  amount: number;
  status: "pending" | "delivered" | "refunded";
  createdAt: Date;
}

export interface LatestReservationProps {
  sx?: SxProps;
}

export function LatestReservation({
  sx,
}: LatestReservationProps): React.JSX.Element {
  const context = React.useContext(DashboardContext);
  const { data, isValidating, mutate } = UseGetLatestReservation({
    enabled: true,
    limit: 5,
  });

  function handleRefresh() {
    mutate();
  }

  if (!data) {
    return <OvalLoader />;
  }

  return (
    <Card sx={sx}>
      <CardHeader
        title="Lịch đặt gần đây nhất"
        action={
          <Button
            color="inherit"
            size="small"
            onClick={handleRefresh}
            startIcon={
              <RefreshIcon
                sx={{
                  fontSize: "var(--icon-fontSize-md)",
                }}
              />
            }
          >
            Làm mới
          </Button>
        }
      />
      <Divider />
      <Box sx={{ width: "100%" }}>
        {isValidating ? (
          <TableSkeleton />
        ) : (
          <Table>
            <TableHead sx={{ backgroundColor: "#f9fafb" }}>
              <TableRow>
                <TableCell>Mã</TableCell>
                <TableCell>Tên người dùng</TableCell>
                <TableCell>Đặt lúc</TableCell>
                <TableCell>Tên sân</TableCell>
                <TableCell>Vào sân</TableCell>
                <TableCell>Ra sân</TableCell>
                <TableCell>Trạng thái đơn</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data.map((reservation: Reservation) => {
                const { label, color } = statusMap[
                  reservation.reservationState
                ] ?? {
                  label: "Unknown",
                  color: "default",
                };

                return (
                  <TableRow hover key={reservation.id}>
                    <TableCell
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {reservation.id}
                    </TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {reservation.user.userName}
                    </TableCell>
                    <TableCell align="center">
                      {dayjs(reservation.createdAt).format("DD/MM/YYYY MM:HHA")}
                    </TableCell>
                    <TableCell>{reservation.court.courtName}</TableCell>
                    <TableCell> {reservation.checkInTime}:00</TableCell>
                    <TableCell align="center">
                      {reservation.checkOutTime}:00
                    </TableCell>
                    <TableCell>
                      <Chip color={color} label={label} size="small" />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Link href="/booking-management">
          View all
          {<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
        </Link>
      </CardActions>
    </Card>
  );
}
