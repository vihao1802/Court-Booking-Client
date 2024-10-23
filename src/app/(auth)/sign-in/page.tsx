"use client";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Visibility, VisibilityOffOutlined } from "@mui/icons-material";
import AppLogo from "@/components/shared/Logo";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: Yup.string().required("Mật khẩu là bắt buộc"),
});

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
          src={
            "https://assets.vogue.com/photos/58917fa297a3db337a24abf8/master/pass/maria-sharapova-tennis.jpg"
          }
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
          src={
            "https://assets.vogue.com/photos/58917fa297a3db337a24abf8/master/pass/maria-sharapova-tennis.jpg"
          }
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
              Đăng nhập
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
              initialValues={{ email: "", password: "" }}
              validationSchema={SignInSchema}
              onSubmit={async (values) => {
                console.log(values);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <Field
                    as={TextField}
                    name="email"
                    type="email"
                    fullWidth
                    id="email"
                    label="Email"
                    variant="outlined"
                    margin="dense"
                    size="medium"
                    color="success"
                    error={touched.email && !!errors.email}
                    helperText={<ErrorMessage name="email" />}
                  />
                  <Field
                    as={TextField}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    id="password"
                    label="Password"
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
                  <Typography
                    sx={{
                      textAlign: "right",
                    }}
                  >
                    <Link
                      sx={{
                        color: "gray",
                        cursor: "pointer",
                        textDecoration: "none",
                      }}
                      href={"/password-recovery"}
                    >
                      Quên mật khẩu
                    </Link>
                  </Typography>
                  <Button
                    type="submit"
                    size="large"
                    sx={{
                      marginTop: "25px",
                      width: "100%",
                      color: "white",
                      backgroundColor: "var(--buttonColor)",
                      ":hover": {
                        backgroundColor: "var(--buttonHoverColor)",
                      },
                    }}
                  >
                    Đăng nhập
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>

          <Box>
            <Typography>
              Chưa có tài khoản.{" "}
              <Link
                sx={{
                  color: "var(--buttonColor)",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
                href={"/sign-up"}
              >
                Đăng ký ngay!
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignInPage;
