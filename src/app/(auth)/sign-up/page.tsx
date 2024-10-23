"use client";
import {
  Box,
  Button,
  InputAdornment,
  Link,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import * as Yup from "yup";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Visibility, VisibilityOffOutlined } from "@mui/icons-material";
import AppLogo from "@/components/shared/Logo";

const SignInSchema = Yup.object().shape({
  username: Yup.string().required("Tên đăng nhập là bắt buộc"),
  email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ. Phải có 10 số")
    .required("Số điện thoại là bắt buộc"),
  password: Yup.string().required("Mật khẩu là bắt buộc"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Mật khẩu xác nhận không khớp")
    .required("Mật khẩu xác nhận là bắt buộc"),
});

const SignUpPage = () => {
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
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100vh",
        margin: "0",
      }}
    >
      <Box
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          position: "relative",
          width: "50%",
        }}
      >
        <Box
          component="img"
          src={"https://i.ebayimg.com/images/g/bfEAAOSwaipjrBTc/s-l1200.jpg"}
          sx={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            filter: "blur(0.5px)",
            opacity: "0.7",
          }}
        />
        <Box
          component="img"
          src={"https://i.ebayimg.com/images/g/bfEAAOSwaipjrBTc/s-l1200.jpg"}
          sx={{
            position: "absolute",
            top: "0",
            height: "100%",
            width: "100%",
            objectFit: "contain",
          }}
        />
      </Box>
      <Box
        sx={{
          width: {
            xs: "100%",
            md: "50%",
          },
          display: "flex",
          overflow: "auto",
          padding: "20px 0",
        }}
      >
        <Box
          sx={{
            margin: "auto",
            maxWidth: "520px",
            width: "100%",
            textAlign: "center",
            "& > * + *": {
              marginTop: "20px",
            },
          }}
        >
          <AppLogo />
          <Box>
            <Typography
              sx={{
                fontSize: "22px",
                paddingTop: "30px",
              }}
            >
              Đăng ký tài khoản
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "10px",
            }}
          >
            <Formik
              initialValues={{
                username: "",
                email: "",
                phone: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={SignInSchema}
              onSubmit={async (values) => {
                console.log(values);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <Field
                    as={TextField}
                    name="username"
                    type="text"
                    fullWidth
                    id="username"
                    label="Tên đăng nhập"
                    variant="outlined"
                    margin="dense"
                    size="normal"
                    color="success"
                    error={touched.username && !!errors.username}
                    helperText={<ErrorMessage name="username" />}
                  />
                  <Field
                    as={TextField}
                    name="email"
                    type="email"
                    fullWidth
                    id="email"
                    label="Email"
                    variant="outlined"
                    margin="dense"
                    size="normal"
                    color="success"
                    error={touched.email && !!errors.email}
                    helperText={<ErrorMessage name="email" />}
                  />
                  <Field
                    as={TextField}
                    name="phone"
                    type="text"
                    fullWidth
                    id="phone"
                    label="Số điện thoại"
                    variant="outlined"
                    margin="dense"
                    size="normal"
                    color="success"
                    error={touched.phone && !!errors.phone}
                    helperText={<ErrorMessage name="phone" />}
                  />

                  <Field
                    as={TextField}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    id="password"
                    label="Mật khẩu"
                    variant="outlined"
                    margin="dense"
                    size="normal"
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
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    fullWidth
                    id="confirmPassword"
                    label="Mật khẩu xác nhận"
                    variant="outlined"
                    margin="dense"
                    size="normal"
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
                    }}
                  >
                    Đăng ký
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>

          <Box>
            <Typography>
              Đã có tài khoản.{" "}
              <Link
                sx={{
                  color: "var(--buttonColor)",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
                href={"/sign-in"}
              >
                Đăng nhập ngay!
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpPage;
