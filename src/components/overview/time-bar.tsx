"use client";
import { DashboardContext } from "@/context/dash-board-context";
import { Box, Button } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import React, { useContext, useState } from "react";
import BasicDatePicker from "../book-court/date-time/DatePicker";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  dateFrom: Yup.date()
    .required("Vui lòng chọn từ ngày")
    .max(Yup.ref("dateTo"), "Từ ngày không được lớn hơn Đến ngày"),
  dateTo: Yup.date()
    .required("Vui lòng chọn đến ngày")
    .min(Yup.ref("dateFrom"), "Đến ngày không được nhỏ hơn Từ ngày"),
});
const TimeNavBar = () => {
  const context = useContext(DashboardContext);

  const initialValues = {
    dateFrom: context?.period.from || dayjs().subtract(1, "month").startOf("M"),
    dateTo: context?.period.to || dayjs(),
  };
  const handleSubmit = (values: { dateFrom: Dayjs; dateTo: Dayjs }) => {
    // Điều chỉnh ngày
    const adjustedFrom = dayjs(values.dateFrom).startOf("M");
    const adjustedTo = dayjs(values.dateTo).endOf("M");

    context?.setPeriod({ from: adjustedFrom, to: adjustedTo });
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldValue,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              padding: "1rem",
              backgroundColor: "var(--bg-color)",
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Từ ngày"
                  views={["month", "year"]}
                  maxDate={dayjs(values.dateTo).subtract(1, "month")}
                  value={dayjs(values.dateFrom)}
                  onChange={(value) => setFieldValue("dateFrom", value)}
                  slotProps={{
                    textField: {
                      error: Boolean(touched.dateFrom && errors.dateFrom),
                      helperText:
                        touched.dateFrom && errors.dateFrom
                          ? String(errors.dateFrom)
                          : undefined,
                      InputProps: { readOnly: true },
                      sx: {
                        width: "250px",
                        ".MuiOutlinedInput-input": { padding: "0.5rem" },
                      },
                    },
                  }}
                  sx={{
                    width: "100%",
                    ".MuiOutlinedInput-root": {
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "var(--buttonColor)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "var(--buttonColor)",
                      },
                    },
                    ".MuiFormLabel-root": {
                      "&.Mui-focused": {
                        color: "var(--buttonColor)",
                      },
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Đến ngày"
                  views={["month", "year"]}
                  minDate={dayjs(values.dateFrom).add(1, "day")}
                  value={values.dateTo}
                  onChange={(value) => setFieldValue("dateTo", value)}
                  slotProps={{
                    textField: {
                      error: Boolean(touched.dateTo && errors.dateTo),
                      helperText:
                        touched.dateTo && errors.dateTo
                          ? String(errors.dateTo)
                          : undefined,
                      InputProps: { readOnly: true },
                      sx: {
                        width: "250px",
                        ".MuiOutlinedInput-input": { padding: "0.5rem" },
                      },
                    },
                  }}
                  sx={{
                    width: "100%",
                    ".MuiOutlinedInput-root": {
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "var(--buttonColor)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "var(--buttonColor)",
                      },
                    },
                    ".MuiFormLabel-root": {
                      "&.Mui-focused": {
                        color: "var(--buttonColor)",
                      },
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>

            <Button variant="contained" type="submit">
              Thống kê
            </Button>
          </Box>
        </form>
      )}
    </Formik>
    // <Box
    //   sx={{
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     gap: "1rem",
    //     padding: "1rem",
    //     backgroundColor: "var(--bg-color)",
    //     boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
    //   }}
    // >
    //   <LocalizationProvider dateAdapter={AdapterDayjs}>
    //     <DemoContainer components={["DatePicker"]}>
    //       <DatePicker
    //         label="Từ ngày"
    //         maxDate={dayjs(dateTo).subtract(1, "day")}
    //         defaultValue={dayjs(dateTo).subtract(1, "day")}
    //         onChange={handleDateChangeFrom}
    //         slotProps={{
    //           textField: {
    //             InputProps: {
    //               readOnly: true,
    //             },
    //             sx: {
    //               width: "250px", // Điều chỉnh chiều rộng tại đây
    //               ".MuiOutlinedInput-input": {
    //                 padding: "0.5rem", // Điều chỉnh padding của input
    //               },
    //             },
    //           },
    //         }}
    //         sx={{
    //           width: "100%",
    //           ".MuiOutlinedInput-root": {
    //             "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    //               borderColor: "var(--buttonColor)",
    //             },
    //             "&:hover .MuiOutlinedInput-notchedOutline": {
    //               borderColor: "var(--buttonColor)",
    //             },
    //           },
    //           ".MuiFormLabel-root": {
    //             "&.Mui-focused": {
    //               color: "var(--buttonColor)",
    //             },
    //           },
    //         }}
    //       />
    //     </DemoContainer>
    //   </LocalizationProvider>

    //   <LocalizationProvider dateAdapter={AdapterDayjs}>
    //     <DemoContainer components={["DatePicker"]}>
    //       <DatePicker
    //         label="Đến ngày"
    //         minDate={dayjs(dateFrom).add(1, "day")}
    //         disableFuture
    //         defaultValue={dayjs()}
    //         onChange={handleDateChangeTo}
    //         slotProps={{
    //           textField: {
    //             InputProps: {
    //               readOnly: true,
    //             },
    //             sx: {
    //               width: "250px", // Điều chỉnh chiều rộng tại đây
    //               ".MuiOutlinedInput-input": {
    //                 padding: "0.5rem", // Điều chỉnh padding của input
    //               },
    //             },
    //           },
    //         }}
    //         sx={{
    //           width: "100%",
    //           ".MuiOutlinedInput-root": {
    //             "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    //               borderColor: "var(--buttonColor)",
    //             },
    //             "&:hover .MuiOutlinedInput-notchedOutline": {
    //               borderColor: "var(--buttonColor)",
    //             },
    //           },
    //           ".MuiFormLabel-root": {
    //             "&.Mui-focused": {
    //               color: "var(--buttonColor)",
    //             },
    //           },
    //         }}
    //       />
    //     </DemoContainer>
    //   </LocalizationProvider>
    //   <Button variant="contained" onClick={handleButtonClick}>
    //     Thống kê
    //   </Button>
    // </Box>
  );
};

export default TimeNavBar;
