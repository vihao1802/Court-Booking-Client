import { Button } from "@mui/material";
import React from "react";

interface TimeFilterButtonProps {
  handleButtonClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
}

const TimeFilterButton: React.FC<TimeFilterButtonProps> = ({
  handleButtonClick,
  isActive,
  children,
}) => {
  return (
    <Button
      onClick={handleButtonClick}
      sx={{
        display: "flex",
        height: "28px", // 7 * 4px (Tailwind's spacing scale)
        width: "max-content", // equivalent to w-max
        cursor: "pointer",
        alignItems: "center", // items-center
        borderRadius: "8px", // rounded-lg (lg is 8px)
        border: "1px solid rgb(67 97 238)",
        paddingX: "12px", // px-3 (3 * 4px = 12px)
        paddingY: "4px", // py-1 (1 * 4px = 4px)
        transition: "all 0.2s", // transition-all
        borderColor: "", // border-primary
        backgroundColor: "rgb(235 238 253)", // bg-primary-50
        color: "rgb(0 37 140)", // text-primary-700
      }}
    >
      {children}
    </Button>
  );
};

export default TimeFilterButton;
