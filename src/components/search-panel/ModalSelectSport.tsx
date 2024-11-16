import {
  Autocomplete,
  Box,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import Image from "next/image";
import badminton from "@/assets/images/Badminton.png";
import tennis from "@/assets/images/Tennis.png";
import volleyball from "@/assets/images/Volleyball.png";
import football from "@/assets/images/Football.png";
import basketball from "@/assets/images/Basketball.png";
import futsal from "@/assets/images/Futsal.png";
import tableTennis from "@/assets/images/TableTennis.png";
import { SearchContext } from "./SearchPanel";

const types = [
  {
    label: "Cầu lông",
    src: badminton,
    type: 1,
  },
  {
    label: "Bóng bàn",
    src: tableTennis,
    type: 1,
  },
  {
    label: "Futsal",
    src: futsal,
    type: 2,
  },
  {
    label: "Bóng chuyền",
    src: volleyball,
    type: 2,
  },
  {
    label: "Bóng đá",
    src: football,
    type: 2,
  },
  {
    label: "Tennis",
    src: tennis,
    type: 1,
  },
  {
    label: "Bóng rổ",
    src: basketball,
    type: 2,
  },
];

const ModalSelectSport = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const { sport, setSport } = useContext(SearchContext);
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: "600px",
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          border: "1px solid #E0E3E7",
          borderRadius: "20px",
        }}
      >
        <Autocomplete
          disablePortal
          options={types}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tìm kiếm"
              size="small"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#E0E3E7",
                  },
                  "&:hover fieldset": {
                    borderColor: "#B2BAC2",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#6F7E8C",
                  },
                },
                "& label.Mui-focused": {
                  color: "#A0AAB4",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#B2BAC2",
                },
              }}
            />
          )}
        />

        <Box
          sx={{
            paddingTop: "20px",
          }}
        >
          <Typography variant="body1" fontWeight="bold">
            Thể thao quần vợt
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              padding: "20px 0",
              gap: "20px",
            }}
          >
            {types
              .filter((court) => court.type === 1)
              .map((court, index) => (
                <Paper
                  key={index}
                  sx={{
                    position: "relative",
                    width: "100px",
                    height: "100px",
                    padding: "10px",
                    backgroundColor: "rgba(46, 125, 50, .2)",
                    cursor: "pointer",
                    "&:hover": {
                      border: "1px solid #009265",
                    },
                  }}
                  onClick={() => {
                    setSport(court.label);
                    handleClose();
                  }}
                >
                  <Typography fontSize="13px" color="#222222">
                    {court.label}
                  </Typography>
                  <Image
                    src={court.src}
                    alt={court.label}
                    width={100}
                    height={100}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                  />
                </Paper>
              ))}
          </Box>
        </Box>

        <Box
          sx={{
            paddingTop: "20px",
          }}
        >
          <Typography variant="body1" fontWeight="bold">
            Thể thao đồng đội
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              padding: "20px 0",
            }}
          >
            {types
              .filter((court) => court.type === 2)
              .map((court, index) => (
                <Paper
                  key={index}
                  sx={{
                    position: "relative",
                    width: "100px",
                    height: "100px",
                    padding: "10px",
                    backgroundColor: "rgba(46, 125, 50, .2)",
                    cursor: "pointer",
                    "&:hover": {
                      border: "1px solid #009265",
                    },
                  }}
                  onClick={() => {
                    setSport(court.label);
                    handleClose();
                  }}
                >
                  <Typography fontSize="13px" color="#222222">
                    {court.label}
                  </Typography>
                  <Image
                    src={court.src}
                    alt={court.label}
                    width={100}
                    height={100}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                  />
                </Paper>
              ))}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalSelectSport;
