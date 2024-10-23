"use client";
import OTPInput from "@/components/password-recovery/OTPInput";
import Recovered from "@/components/password-recovery/Recovered";
import ResetPassword from "@/components/password-recovery/ResetPassword";
import SendOTPEmail from "@/components/password-recovery/SendOTPEmail";
import { useState, createContext } from "react";

export const RecoveryContext = createContext({
  page: "login",
  setPage: (page: string) => {},
  email: "",
  setEmail: (email: string) => {},
  otp: 0,
  setOTP: (otp: number) => {},
});

const PasswordRecoveryPage = () => {
  const [page, setPage] = useState("send-email");
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState(0);

  const NavigateComponents = () => {
    if (page === "send-email") return <SendOTPEmail />;
    if (page === "otp") return <OTPInput />;
    if (page === "reset") return <ResetPassword />;

    return <Recovered />;
  };

  return (
    <RecoveryContext.Provider
      value={{
        page,
        setPage,
        email,
        setEmail,
        otp,
        setOTP,
      }}
    >
      <div className="flex justify-center items-center h-[100vh]">
        <NavigateComponents />
      </div>
    </RecoveryContext.Provider>
  );
};

export default PasswordRecoveryPage;
