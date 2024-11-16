import React, { useState, MouseEvent } from "react";
import homePic from "@/assets/images/cover_desktop.jpg";
import explorePic from "@/assets/images/explore_page_header.jpg";
import bookingPic from "@/assets/images/search-venue.jpg";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ModalSelectSport from "@/components/search-panel/ModalSelectSport";
import SelectDateTime from "@/components/search-panel/SelectDateTime";
import { Dayjs } from "dayjs";

const types = [
  {
    label: "Cầu lông",
  },
  {
    label: "Bóng bàn",
  },
  {
    label: "Futsal",
  },
  {
    label: "Bóng chuyền",
  },
  {
    label: "Bóng đá",
  },
  {
    label: "Tennis",
  },
  {
    label: "Bóng rổ",
  },
];

export const SearchContext = React.createContext({
  sport: "",
  setSport: (sport: string) => {},
  dateTime: "",
  setDateTime: (dateTime: string) => {},
});

const SearchPanel = () => {
  const pathname = usePathname();

  const [sport, setSport] = useState("");
  const [dateTime, setDateTime] = useState("");

  // Modal select sport
  const [openModalSelectSport, setOpenModalSelectSport] = useState(false);
  const handleOpenModalSelectSport = () => setOpenModalSelectSport(true);
  const handleCloseModalSelectSport = () => setOpenModalSelectSport(false);

  // Modal select date and time
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClickSelectDateTime = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSelectDateTime = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        height: pathname === "/" ? "500px" : "200px",
        width: "100%",
        position: "relative",
        marginBottom: pathname === "/" ? "10px" : "70px",
      }}
    >
      <Image
        src={
          pathname === "/"
            ? homePic
            : pathname === "/explore"
            ? explorePic
            : bookingPic
        }
        alt="cover"
        style={
          pathname === "/"
            ? {
                objectFit: "cover",
                objectPosition: "center",
                width: "100%",
                height: "500px",
              }
            : {
                objectFit: "cover",
                objectPosition: "center",
                width: "100%",
                height: "200px",
              }
        }
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust opacity here
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "white",
          zIndex: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: "38px",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {pathname === "/"
            ? "Hệ thống hỗ trợ đặt sân trực tuyến"
            : pathname === "/explore"
            ? "Khám phá"
            : "Đặt sân để trải nghiệm"}
        </Typography>
        {pathname === "/" && (
          <Typography
            sx={{
              fontSize: "22px",
              color: "white",
            }}
          >
            Đặt sân nhanh chóng, dễ dàng và tiện lợi với courtsite ngay hôm nay
          </Typography>
        )}
      </Box>
      <SearchContext.Provider
        value={{ sport, setSport, dateTime, setDateTime }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
            padding: "20px 30px",
            position: "absolute",
            top: pathname === "/" ? "80%" : "100%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            backgroundColor: "white",
            height: "100px",
            width: "100%",
            maxWidth: "800px",
            borderRadius: "50px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Box
            sx={{
              flex: 2,
              margin: "5px 0",
              cursor: "pointer",
            }}
          >
            <Typography fontWeight="bold" mb="2px">
              Môn thể thao
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="body2"
                color="#858585"
                onClick={handleOpenModalSelectSport}
              >
                {sport || "Chọn môn thể thao"}
              </Typography>
              {sport !== "" && (
                <Typography
                  variant="body2"
                  color="#858585"
                  onClick={() => setSport("")}
                >
                  <CloseRoundedIcon />
                </Typography>
              )}
            </Box>
          </Box>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Box
            sx={{
              flex: 2,
              margin: "5px 0",
              cursor: "pointer",
            }}
          >
            <Typography fontWeight="bold" mb="2px">
              Thời gian
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="body2"
                color="#858585"
                onClick={handleClickSelectDateTime}
              >
                {dateTime || "Chọn thời gian"}
              </Typography>
              {dateTime !== "" && (
                <Typography
                  variant="body2"
                  color="#858585"
                  onClick={() => setDateTime("")}
                >
                  <CloseRoundedIcon />
                </Typography>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              flex: 1,
              padding: "5px 0",
            }}
          >
            <Button
              sx={{
                height: "100%",
                width: "100%",
                backgroundColor: "var(--buttonColor)",
                borderRadius: "50px",
                color: "white",
              }}
              startIcon={<SearchOutlinedIcon />}
            >
              Tìm kiếm
            </Button>
          </Box>
        </Box>

        <ModalSelectSport
          open={openModalSelectSport}
          handleClose={handleCloseModalSelectSport}
        />
        <SelectDateTime
          anchorEl={anchorEl}
          handleClose={handleCloseSelectDateTime}
        />
      </SearchContext.Provider>
    </Box>
  );
};

export default SearchPanel;
