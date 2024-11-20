import { Box } from "@mui/material";
import React, { Suspense, useContext, useState } from "react";
import ProfileTextField from "../ProfileTextField";
import ProfileAutocomplete from "../ProfileAutocomplete";
import DateOfBirthPicker from "./DateOfBirthPicker";
import dayjs from "dayjs";
import { UserContext } from "@/context/user-context";
const gender = [
  {
    id: 1,
    label: "Nam",
    value: true,
  },
  {
    id: 2,
    label: "Nữ",
    value: false,
  },
];
const PersonalInfo = () => {
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
        id="username"
        label="Tên người dùng"
        variant="outlined"
        description="Tên người dùng sẽ được hiển thị trên hệ thống."
        onChangeHandle={(e) => {
          if (e.target.value.length <= 0) {
            context?.setError(true);
            setError(true);
          } else {
            context?.setError(errorState || false);
            setError(false);
          }
          context?.setUserData({
            ...context.userData,
            userName: e.target.value,
          });
        }}
        error={error}
        helptext="Tên người dùng không được để trống"
      >
        {context?.userData.userName}
      </ProfileTextField>
      <DateOfBirthPicker />
      <ProfileAutocomplete
        id="gender"
        options={gender}
        label="Giới tính"
        defaultValue={context?.userData.gender}
        onChangeHandle={(e, value) => {
          context?.setUserData({
            ...context.userData,
            gender: value,
          });
        }}
      />
      <ProfileTextField
        id="location"
        label="Địa chỉ"
        variant="outlined"
        onChangeHandle={(e) => {
          context?.setUserData({
            ...context.userData,
            location: e.target.value,
          });
        }}
      >
        {context?.userData.location}
      </ProfileTextField>
    </Box>
  );
};

export default PersonalInfo;
