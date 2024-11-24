import * as Yup from "yup";

export const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: Yup.string()
    .required("Mật khẩu là bắt buộc")
    .matches(/[A-Z]/, "Mật khẩu phải có ít nhất 1 chữ in hoa")
    .matches(/[0-9]/, "Mật khẩu phải có ít nhất 1 chữ số")
    .matches(
      /[^A-Za-z0-9.#]/,
      "Mật khẩu phải có ít nhất 1 ký tự đặc biệt (không bao gồm '.' và '#')"
    )
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
});
