"use client";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { RecoveryContext } from "@/app/(auth)/password-recovery/page";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Visibility, VisibilityOffOutlined } from "@mui/icons-material";

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Mật khẩu là bắt buộc"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Mật khẩu xác nhận không khớp")
    .required("Mật khẩu xác nhận là bắt buộc"),
});

const ResetPassword = () => {
  const { setPage } = useContext(RecoveryContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
        borderRadius: 4,
        padding: 3,
        maxWidth: "420px",
        width: "100%",
        textAlign: "center",
        "& > * + *": {
          marginTop: "20px",
        },
      }}
    >
      <Typography
        sx={{
          fontSize: "22px",
        }}
      >
        Tạo mật khẩu mới
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={ResetPasswordSchema}
          onSubmit={(values) => {
            // handle form submission
            console.log(values);
            setPage("recovered");
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                as={TextField}
                fullWidth
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                label="Mật khẩu"
                variant="outlined"
                margin="dense"
                size="medium"
                color="success"
                error={touched.password && !!errors.password}
                helperText={<ErrorMessage name="password" />}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePasswordVisibility}
                        onMouseDown={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <VisibilityOffOutlined sx={{ color: "black" }} />
                        ) : (
                          <Visibility sx={{ color: "black" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Field
                as={TextField}
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                label="Mật khẩu xác nhận"
                variant="outlined"
                margin="dense"
                size="medium"
                color="success"
                error={touched.confirmPassword && !!errors.confirmPassword}
                helperText={<ErrorMessage name="confirmPassword" />}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={toggleConfirmPasswordVisibility}
                        onMouseDown={toggleConfirmPasswordVisibility}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOffOutlined sx={{ color: "black" }} />
                        ) : (
                          <Visibility sx={{ color: "black" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                size="large"
                sx={{
                  marginTop: "10px",
                  width: "100%",
                  color: "white",
                  backgroundColor: "var(--buttonColor)",
                  ":hover": {
                    backgroundColor: "var(--buttonHoverColor)",
                  },
                  position: "relative",
                }}
              >
                Hoàn tất
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ResetPassword;
