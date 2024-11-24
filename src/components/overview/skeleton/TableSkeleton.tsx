import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Skeleton from "@mui/joy/Skeleton";

const TableSkeleton = ({ rows = 5 }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Mã</TableCell>
            <TableCell>Tên người dùng</TableCell>
            <TableCell>Đặt lúc</TableCell>
            <TableCell>Tên sân</TableCell>
            <TableCell>Check in</TableCell>
            <TableCell>Thời gian sử dụng sân</TableCell>
            <TableCell>Trạng thái đơn</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(rows)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton variant="text" width="40%" />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width="60%" />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width="80%" />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width="50%" />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width="70%" />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width="70%" />
              </TableCell>
              <TableCell>
                <Skeleton variant="rectangular" width={80} height={24} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableSkeleton;
