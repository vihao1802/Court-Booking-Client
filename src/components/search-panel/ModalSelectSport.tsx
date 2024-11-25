import {
  Autocomplete,
  Box,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import Image, { StaticImageData } from "next/image";
import badminton from "@/assets/images/Badminton.png";
import tennis from "@/assets/images/Tennis.png";
import volleyball from "@/assets/images/Volleyball.png";
import football from "@/assets/images/Football.png";
import basketball from "@/assets/images/Basketball.png";
import futsal from "@/assets/images/Futsal.png";
import tableTennis from "@/assets/images/TableTennis.png";
import { SearchContext } from "./SearchPanel";
import { useGetCourtTypeList } from "@/hooks/court-type/useGetCourtTypeList";
import { CourtType } from "@/models/court-type";
import { exploreCategoriesTabs as types } from "@/constants";

const ModalSelectSport = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const { sport, setSport } = useContext(SearchContext);

  const { data: courtTypeList, isLoading: courtTypeListLoading } =
    useGetCourtTypeList({ isdisabled: 0 });

  if (courtTypeListLoading) return;
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
        <Box>
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
            {courtTypeList
              .filter((court: CourtType) =>
                types.some(
                  (type) =>
                    type.value === court.id.split("-")[1] && type.type === 1
                )
              )
              .map((court: CourtType, index: number) => (
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
                      border: "1px solid var(--buttonColor)",
                    },
                    border: "1px solid white",
                  }}
                  onClick={() => {
                    setSport({
                      id: court.id,
                      courtTypeName: court.courtTypeName,
                    });
                    handleClose();
                  }}
                >
                  <Typography fontSize="13px" color="#222222">
                    {court.courtTypeName}
                  </Typography>
                  <Image
                    src={
                      types.find((x) => x.value === court?.id.split("-")[1])
                        ?.img as StaticImageData
                    }
                    alt={court.courtTypeName}
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
            {courtTypeList
              .filter((court: CourtType) =>
                types.some(
                  (type) =>
                    type.value === court.id.split("-")[1] && type.type === 2
                )
              )
              .map((court: any, index: number) => (
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
                      border: "1px solid var(--buttonColor)",
                    },
                    border: "1px solid white",
                  }}
                  onClick={() => {
                    setSport({
                      id: court.id,
                      courtTypeName: court.courtTypeName,
                    });
                    handleClose();
                  }}
                >
                  <Typography fontSize="13px" color="#222222">
                    {court.courtTypeName}
                  </Typography>
                  <Image
                    src={
                      types.find((x) => x.value === court?.id.split("-")[1])
                        ?.img as StaticImageData
                    }
                    alt={court.courtTypeName}
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
