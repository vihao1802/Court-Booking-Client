"use client";
import React, { use, useEffect } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Box,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useUpdateUser } from "@/hooks/user/useUpdateUser";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useAuthenticatedUser } from "@/hooks/auth/useAuthenticatedUser";

const PasswordChangeSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Vui lòng nhập mật khẩu hiện tại"),
  newPassword: Yup.string()
    .min(6, "Mật khẩu mới phải có ít nhất 6 ký tự")
    .required("Vui lòng nhập mật khẩu mới"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), undefined], "Mật khẩu không khớp")
    .required("Vui lòng xác nhận mật khẩu mới"),
});
const PasswordChangeSchemaSecond = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, "Mật khẩu mới phải có ít nhất 6 ký tự")
    .required("Vui lòng nhập mật khẩu mới"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), undefined], "Mật khẩu không khớp")
    .required("Vui lòng xác nhận mật khẩu mới"),
});

const ChangePassword = () => {
  const { user, mutate, firstLoading } = useAuthenticatedUser();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isChangePassword, setIsChangePassword] = React.useState(true);

  const { updatePassword } = useUpdateUser();
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  useEffect(() => {
    if (user) {
      setIsChangePassword(user.changedPassword);
    }
  }, [user]);

  console.log("user", user?.changedPassword);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        padding: "1rem",
        backgroundColor: "white",
        borderRadius: "8px",
      }}
    >
      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={
          isChangePassword ? PasswordChangeSchema : PasswordChangeSchemaSecond
        }
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const res = await updatePassword({
              oldPassword: values.oldPassword,
              newPassword: values.newPassword,
            });
            if (res && res.status >= 200) {
              toast.success("Đổi mật khẩu thành công");
              mutate();
              resetForm();
            } else {
              toast.error("Đổi mật khẩu thất bại");
            }
            setSubmitting(false);
          } catch (error) {
            if (error instanceof AxiosError) {
              console.log("erroraxios", error.response?.data.message);
              toast.error(error.response?.data.message);
              return;
            }
            toast.error("Đổi mật khẩu thất bại");
          }
        }}
      >
        {({
          errors,
          touched,
          handleChange,
          handleBlur,
          resetForm,
          values,
          isSubmitting,
        }) => (
          <Form>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                margin: "0 auto",
              }}
            >
              {/* Mật khẩu hiện tại */}

              <Field
                as={TextField}
                sx={{ display: isChangePassword ? "block" : "none" }}
                type={showPassword ? "text" : "password"}
                name="oldPassword"
                label="Mật khẩu hiện tại"
                color="success"
                value={values.oldPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.oldPassword && Boolean(errors.oldPassword)}
                helperText={touched.oldPassword && errors.oldPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />

              {/* Mật khẩu mới */}
              <Field
                as={TextField}
                type={showPassword ? "text" : "password"}
                name="newPassword"
                label="Mật khẩu mới"
                color="success"
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.newPassword && Boolean(errors.newPassword)}
                helperText={touched.newPassword && errors.newPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />

              {/* Xác nhận mật khẩu */}
              <Field
                as={TextField}
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                color="success"
                label="Xác nhận mật khẩu mới"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
                helperText={touched.confirmPassword && errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />

              {/* Nút Submit */}
              <Button
                type="submit"
                variant="contained"
                color="success"
                disabled={isSubmitting}
                fullWidth
              >
                Đổi mật khẩu
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ChangePassword;
