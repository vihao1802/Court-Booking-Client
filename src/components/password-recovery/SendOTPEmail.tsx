"use client";
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useContext } from "react";
import { RecoveryContext } from "@/app/(auth)/password-recovery/page";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const SendOTPEmailSchema = Yup.object().shape({
  email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
});

const SendOTPEmail = () => {
  const { setPage, setEmail, setOTP } = useContext(RecoveryContext);

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
        Quên mật khẩu
      </Typography>
      <Typography
        sx={{
          color: "gray",
          textAlign: "left",
        }}
        fontSize={"16px"}
      >
        Hãy nhập email của tài khoản. Bạn sẽ nhận được mã OTP gồm 4 chữ số để
        tạo mật khẩu mới.
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Formik
          initialValues={{ email: "" }}
          validationSchema={SendOTPEmailSchema}
          onSubmit={async (values) => {
            // handle send OTP code to email
            const OTP = Math.floor(Math.random() * 9000 + 1000);
            console.log(OTP);
            setOTP(OTP);

            console.log(values.email);
            setEmail(values.email);

            toast.success("Mã OTP đã được gửi!");
            setPage("otp");
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                as={TextField}
                name="email"
                type="email"
                fullWidth
                id="outlined-basic"
                label="Email"
                variant="outlined"
                margin="normal"
                size="medium"
                color="success"
                error={touched.email && !!errors.email}
                helperText={<ErrorMessage name="email" />}
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
                // onClick={() => setPage("otp")}
              >
                Tiếp tục{" "}
                <ArrowForwardIcon
                  sx={{ fontSize: "24px", position: "absolute", right: "20px" }}
                />
              </Button>
            </Form>
          )}
        </Formik>
      </Box>

      <Box>
        <Typography>
          Đã nhớ mật khẩu.{" "}
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
  );
};

export default SendOTPEmail;
