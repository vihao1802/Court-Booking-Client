import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
  username: Yup.string().required("Tên đăng nhập là bắt buộc"),
  email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ. Phải có 10 số")
    .required("Số điện thoại là bắt buộc"),
  password: Yup.string()
    .required("Mật khẩu là bắt buộc")
    .matches(/[A-Z]/, "Mật khẩu phải có ít nhất 1 chữ in hoa")
    .matches(/[0-9]/, "Mật khẩu phải có ít nhất 1 chữ số")
    .matches(
      /[^A-Za-z0-9.#]/,
      "Mật khẩu phải có ít nhất 1 ký tự đặc biệt (không bao gồm '.' và '#')"
    )
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Mật khẩu xác nhận không khớp")
    .required("Mật khẩu xác nhận là bắt buộc"),
  dayOfBirth: Yup.string().required("Ngày sinh là bắt buộc"),
});
