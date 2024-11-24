import { UnauthorizedError } from "@/api/http-errors";
import { UserContext } from "@/context/user-context";
import { useUpdateUser } from "@/hooks/user/useUpdateUser";
import { ToUpdateUser } from "@/mapping/userMapping";
import { Box, Button } from "@mui/material";
import React, { useContext, useEffect } from "react";

interface UpdateButtonProps {
  width?: string;
  children: React.ReactNode;
}
const UpdateButton: React.FC<UpdateButtonProps> = ({ width, children }) => {
  const context = useContext(UserContext);
  const { updateUser, isValidating } = useUpdateUser();

  const handleUpdateButtonClick = async () => {
    try {
      const updateUserData = ToUpdateUser(context?.userData);

      if (!updateUserData) throw new Error("Update user is null");
      await updateUser(updateUserData);
    } catch (error) {
      console.error(error);
      if (error instanceof UnauthorizedError) {
        throw new UnauthorizedError();
      }
    }
  };
  useEffect(() => {
    console.log("validate", isValidating);
  }, [isValidating]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
      }}
    >
      <Button
        onClick={handleUpdateButtonClick}
        variant="contained"
        disabled={isValidating}
        sx={{
          width: width || "100%",
          display: "flex",
          cursor: "pointer",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 1, // Equivalent to `rounded`
          border: "1px solid transparent", // `border border-solid border-transparent`
          textAlign: "center",
          outline: "none",
          transition: "all 0.2s ease-in-out", // Adjust transition if necessary
          boxShadow: "none", // Equivalent to `active:shadow-none`
          "&:active": {
            boxShadow: "none",
            borderColor: "transparent", // `active:border-transparent`
            backgroundColor: "primary.800", // `active:bg-primary-800`
          },
          "&:disabled": {
            cursor: "not-allowed",
            boxShadow: "none",
            backgroundColor: "#ECEFF1", // `disabled:bg-blue-grey-50`
            color: "#B0BEC5", // `disabled:text-blue-grey-200`
          },
          backgroundColor: "primary.main", // `bg-primary`
          color: "white", // `text-white`
          "&:hover": {
            color: "white", // `hover:text-white`
            boxShadow: 2, // `hover:shadow-md`
          },
          "&:focus": {
            borderColor: "primary.700", // `focus:border-primary-700`
          },
          height: "2.5rem", // `h-10`
          paddingY: 2.5, // `py-2.5`
          margin: 0, // `m-0`
        }}
      >
        {children}
      </Button>
    </Box>
  );
};

export default UpdateButton;
