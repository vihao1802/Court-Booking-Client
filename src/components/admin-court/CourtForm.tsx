"use client";

import React, { use, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { CourtImage, CourtImageRequest } from "@/models/court-image";
import {
  Box,
  // Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { Button } from "@mui/joy";
import { formatVND } from "@/utils/format";
import { useGetCourtTypeList } from "@/hooks/court-type/useGetCourtTypeList";
import { LoaderIcon } from "react-hot-toast";
import { CourtType } from "@/models/court-type";
import ImagesUpload from "./ImagesUpload";
import { usePostCourt } from "@/hooks/court/usePostCourt";
import { CourtRequest } from "@/models/court";
import { usePostCourtImageList } from "@/hooks/court/usePostCourtImageList";
import { useGetCourtById } from "@/hooks/court/useGetCourtById";
import { usePutCourt } from "@/hooks/court/usePutCourt";
import ImageUpload from "./ImageUpload";
import toast from "react-hot-toast";

const schema = yup.object({
  courtName: yup.string().required("Không được để trống"),
  courtDescription: yup.string().required("Không được để trống"),
  // courtLocation: yup.string().required("Không được để trống"),
  rentalPricePerHour: yup
    .number()
    .min(1000, "Đơn giá phải từ 1000đ")
    .required("Không được để trống"),
  minimumRentalTime: yup
    .number()
    .min(1, "Thời gian thuê tối thiểu là 1 tiếng")
    .required("Không được để trống"),
  maximumRentalTime: yup
    .number()
    .min(3, "Thời gian thuê tối đa là 3 tiếng")
    .required("Không được để trống"),
  courtTypeId: yup.string().required("Không được để trống"),
  courtImageList: yup
    .array()
    .of(yup.mixed())
    .min(5, "Số lượng ảnh là 5")
    .max(5, "Số lượng ảnh là 5")
    .required("Không được để trống"),
});

interface CourtFormProps {
  courtId: string | null;
  open: boolean;
  handleClose: () => void;
}

const CourtForm = ({ courtId, open, handleClose }: CourtFormProps) => {
  const isAddMode = !courtId;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: courtData, isLoading: courtDataLoading } = useGetCourtById({
    courtId: courtId || "",
    enabled: Boolean(courtId),
  });

  const { data: courtTypeData, isLoading: courtTypeDataLoading } =
    useGetCourtTypeList({ isdisabled: 0 });

  const createNewCourt = usePostCourt();
  const createCourtImageList = usePostCourtImageList();

  const updateCourt = usePutCourt();

  const formikAdd = useFormik({
    enableReinitialize: true,
    initialValues: {
      courtName: courtData?.courtName || "",
      courtDescription: courtData?.courtDescription || "",
      courtLocation: " ",
      rentalPricePerHour: courtData?.rentalPricePerHour || 1000,
      minimumRentalTime: courtData?.minimumRentalTime || 30,
      maximumRentalTime: courtData?.maximumRentalTime || 120,
      courtTypeId: courtData?.courtType.id || "",
      courtImageList: [],
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        console.log(isAddMode);

        setIsSubmitting(true);

        const courtData: CourtRequest = {
          courtName: values.courtName,
          courtDescription: values.courtDescription,
          courtAddress: values.courtLocation,
          rentalPricePerHour: values.rentalPricePerHour,
          minimumRentalTime: values.minimumRentalTime,
          maximumRentalTime: values.maximumRentalTime,
          courtTypeId: values.courtTypeId,
        };

        if (isAddMode) {
          const courtResponse = await createNewCourt(courtData);
          if (courtResponse) {
            const cId = courtResponse.id;

            const formData = new FormData();
            (values.courtImageList as File[]).forEach(
              (image: File, index: number) => {
                formData.append(
                  `courtImages[${index}].imageType`,
                  index === 0 ? "main" : "sub"
                );
                formData.append(`courtImages[${index}].courtImageSrc`, image);
              }
            );

            await createCourtImageList(cId, formData);
            toast.success("Thêm sân thành công");
          }
        } else {
          if (courtId) {
            await updateCourt(courtId, courtData);
            toast.success("Cập nhật sân thành công");
          }
        }
      } catch (error) {
        console.log("Failed to post court:", error);
      } finally {
        setIsSubmitting(false);
        formikAdd.resetForm();
        handleClose();
      }
    },
  });

  useEffect(() => {
    if (courtTypeData) {
      formikAdd.setFieldValue("courtTypeId", courtTypeData[0].id);
    }
  }, [courtTypeData]);

  const courtTypeHandleChange = (event: SelectChangeEvent) => {
    formikAdd.setFieldValue("courtTypeId", event.target.value as string);
  };

  if (courtTypeDataLoading || courtDataLoading) return <LoaderIcon />;

  return (
    <Dialog
      aria-modal="true"
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-paperScrollPaper": {
          height: "100%",
          width: "100%",
          maxHeight: "600px",
          maxWidth: "800px",
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle>{isAddMode ? "Thêm sân mới" : "Chỉnh sửa sân"}</DialogTitle>
      <DialogContent>
        <Box mb="10px">
          <Typography fontSize="12px" color="var(--buttonColor)">
            Tên sân:
          </Typography>
          <TextField
            disabled={isSubmitting}
            autoFocus
            required
            color="success"
            margin="dense"
            id="courtName"
            name="courtName"
            type="text"
            fullWidth
            variant="outlined"
            size="small"
            value={formikAdd.values.courtName}
            helperText={
              formikAdd.touched.courtName &&
              (formikAdd.errors.courtName as string)
            }
            error={
              formikAdd.touched.courtName && Boolean(formikAdd.errors.courtName)
            }
            onChange={formikAdd.handleChange}
          />
        </Box>

        <Box mb="10px">
          <Typography fontSize="12px" color="var(--buttonColor)">
            Đơn giá:
          </Typography>
          <TextField
            disabled={isSubmitting}
            autoFocus
            required
            color="success"
            margin="dense"
            id="rentalPricePerHour"
            name="rentalPricePerHour"
            type="text"
            fullWidth
            variant="outlined"
            size="small"
            value={formatVND(formikAdd.values.rentalPricePerHour)}
            helperText={
              formikAdd.touched.rentalPricePerHour &&
              (formikAdd.errors.rentalPricePerHour as string)
            }
            error={
              formikAdd.touched.rentalPricePerHour &&
              Boolean(formikAdd.errors.rentalPricePerHour)
            }
            onChange={(e) => {
              formikAdd.setFieldValue(
                "rentalPricePerHour",
                Number(e.target.value.replace(/\D/g, ""))
              );
            }}
          />
        </Box>

        <Box mb="10px">
          <Typography fontSize="12px" color="var(--buttonColor)">
            {"Thời gian thuê tối thiểu (tiếng):"}
          </Typography>
          <TextField
            disabled={isSubmitting}
            autoFocus
            required
            color="success"
            margin="dense"
            id="minimumRentalTime"
            name="minimumRentalTime"
            type="number"
            fullWidth
            variant="outlined"
            size="small"
            value={formikAdd.values.minimumRentalTime}
            helperText={
              formikAdd.touched.minimumRentalTime &&
              (formikAdd.errors.minimumRentalTime as string)
            }
            error={
              formikAdd.touched.minimumRentalTime &&
              Boolean(formikAdd.errors.minimumRentalTime)
            }
            onChange={formikAdd.handleChange}
          />
        </Box>

        <Box mb="10px">
          <Typography fontSize="12px" color="var(--buttonColor)">
            {"Thời gian thuê tối đa (tiếng):"}
          </Typography>
          <TextField
            disabled={isSubmitting}
            autoFocus
            required
            color="success"
            margin="dense"
            id="maximumRentalTime"
            name="maximumRentalTime"
            type="number"
            fullWidth
            variant="outlined"
            size="small"
            value={formikAdd.values.maximumRentalTime}
            helperText={
              formikAdd.touched.maximumRentalTime &&
              (formikAdd.errors.maximumRentalTime as string)
            }
            error={
              formikAdd.touched.maximumRentalTime &&
              Boolean(formikAdd.errors.maximumRentalTime)
            }
            onChange={formikAdd.handleChange}
          />
        </Box>

        <Box mb="10px">
          <Typography fontSize="12px" color="var(--buttonColor)">
            Loại sân:
          </Typography>
          <Select
            disabled={isSubmitting}
            value={formikAdd.values.courtTypeId}
            onChange={courtTypeHandleChange}
            size="small"
            fullWidth
            color="success"
          >
            {courtTypeData?.map((type: CourtType) => (
              <MenuItem key={type.id} value={type.id}>
                {type.courtTypeName}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box mb="10px">
          <Typography fontSize="12px" color="var(--buttonColor)">
            Mô tả:
          </Typography>
          <TextField
            disabled={isSubmitting}
            autoFocus
            required
            color="success"
            margin="dense"
            id="courtDescription"
            name="courtDescription"
            type="text"
            rows={5}
            multiline
            fullWidth
            variant="outlined"
            size="small"
            value={formikAdd.values.courtDescription}
            helperText={
              formikAdd.touched.courtDescription &&
              typeof formikAdd.errors.courtDescription === "string"
                ? formikAdd.errors.courtDescription
                : undefined
            }
            error={
              formikAdd.touched.courtDescription &&
              Boolean(formikAdd.errors.courtDescription)
            }
            onChange={formikAdd.handleChange}
          />
        </Box>

        <Box mb="10px">
          <Typography fontSize="12px" color="var(--buttonColor)" mb="10px">
            Hình ảnh:{" "}
          </Typography>
          {isAddMode && (
            <Typography color="black" fontStyle="italic" fontSize="12px">
              * Ảnh đầu tiên sẽ được chọn làm ảnh chính
            </Typography>
          )}

          {isAddMode ? (
            <>
              <ImagesUpload
                value={formikAdd.values.courtImageList}
                onChange={(value) => {
                  formikAdd.setFieldValue("courtImageList", value);
                }}
              />
              {formikAdd.touched.courtImageList &&
                formikAdd.errors.courtImageList && (
                  <Typography fontSize="12px" color="error" mt="5px">
                    {formikAdd.errors.courtImageList as string}
                  </Typography>
                )}
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                gap: 1.5,
                width: "100%",
                maxWidth: "100%",
              }}
            >
              {courtData?.courtImageList
                .sort((a: CourtImage, b: CourtImage) =>
                  a.imageType === "main" ? -1 : b.imageType === "main" ? 1 : 0
                )
                .map((image: CourtImage, index: number) => (
                  <ImageUpload key={index} image={image} />
                ))}
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: "grey" }} variant="plain">
          Hủy
        </Button>
        <Button
          onClick={formikAdd.submitForm}
          disabled={isSubmitting}
          loading={isSubmitting}
          variant="plain"
          sx={{ color: "var(--buttonColor)" }}
        >
          {isAddMode ? "Thêm" : "Lưu"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CourtForm;
