import { Box } from "@mui/material";
import React, { useContext, useState } from "react";
import ProfileTextField from "../ProfileTextField";
import ProfileAutocomplete from "../ProfileAutocomplete";
import { UserContext } from "@/context/user-context";
import { isValidatePhoneNumber } from "@/utils/validate";

interface PersonalContactProps {}
const PersonalContact = ({}: PersonalContactProps) => {
  const context = useContext(UserContext);
  const errorState = context?.error;
  const [error, setError] = useState(false);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <ProfileTextField
        id="email"
        label="Email"
        variant="outlined"
        description="We will be sending your booking confirmation to this email."
        disable={true}
      >
        {context?.userData.email}
      </ProfileTextField>
      <ProfileTextField
        id="phoneNumber"
        label="Số điện thoại"
        variant="outlined"
        onChangeHandle={(e) => {
          if (e.target.value.length > 10) return;
          if (isNaN(Number(e.target.value))) return;
          if (!isValidatePhoneNumber(e.target.value)) {
            context?.setError(true);
            setError(true);
          } else {
            context?.setError(errorState || false);
            setError(false);
          }
          context?.setUserData({
            ...context.userData,
            phoneNumber: e.target.value,
          });
        }}
        error={error}
        helptext="Số điện thoại không hợp lệ"
      >
        {context?.userData.phoneNumber}
      </ProfileTextField>
    </Box>
  );
};

export default PersonalContact;
