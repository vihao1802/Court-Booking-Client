import { Box, Divider, Skeleton } from "@mui/material";
import React from "react";

const ProfileSkeleton = () => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* top part */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          backgroundColor: "white",
          borderRadius: "8px",
          marginBottom: "1rem",
        }}
      >
        {/* top of top part */}
        <Skeleton
          variant="rounded"
          sx={{
            width: "100%",
            height: "10rem",
          }}
        />

        {/* bottom of top part */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "1rem",
            gap: "0.75rem",
          }}
        >
          <Divider
            sx={{
              width: "100%",
              fontSize: "0.875rem",
              fontWeight: "200",
              fontStyle: "italic",
              color: "rgb(109, 105, 123)",
            }}
          >
            <Skeleton
              variant="text"
              sx={{ fontSize: "0.875rem", width: "5rem" }}
            />
          </Divider>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Skeleton
                variant="circular"
                sx={{
                  width: "2rem",
                  height: "2rem",
                }}
              />
              <Skeleton
                variant="text"
                sx={{
                  fontSize: "1rem",
                  width: "5rem",
                }}
              />
            </Box>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Skeleton
                variant="circular"
                sx={{
                  width: "2rem",
                  height: "2rem",
                }}
              />
              <Skeleton
                variant="text"
                sx={{
                  fontSize: "1rem",
                  width: "5rem",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* bottom part */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          gap: "1rem",
          width: "100%",
          maxWidth: "1056px",
          padding: "1rem",
        }}
      >
        {/* Booking */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.5rem",
            }}
          >
            <Skeleton
              variant="text"
              sx={{
                fontSize: "1rem",
                width: "5rem",
              }}
            />
            <Skeleton variant="rounded" width="80" height="80" />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              padding: "1rem",
              border: "1px solid rgb(235 238 253 )",
              borderRadius: "8px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Skeleton
                variant="text"
                sx={{
                  fontSize: "0.7rem",
                }}
              />
              <Skeleton
                variant="text"
                sx={{
                  fontSize: "1rem",
                }}
              />
              <Skeleton
                variant="text"
                sx={{
                  fontSize: "0.7rem",
                }}
              />
            </Box>
            <Box>
              <Divider orientation="vertical"></Divider>
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "0.5rem",
                  marginBottom: "1rem",
                }}
              >
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: "0.7rem",
                  }}
                />
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: "0.7rem",
                  }}
                />
              </Box>
              <Box sx={{ marginBottom: "0.2rem" }}>
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: "1rem",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: "0.7rem",
                  }}
                />
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: "0.7rem",
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Contact */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.5rem",
            }}
          >
            <Skeleton
              variant="text"
              sx={{
                fontSize: "1rem",
                width: "5rem",
              }}
            />
            <Skeleton variant="rounded" width="80" height="80" />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <Skeleton
                variant="text"
                sx={{
                  fontSize: "1rem",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "0.5rem",
                }}
              >
                <Skeleton variant="rounded" width="80" />
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: "1rem",
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <Skeleton
                variant="text"
                sx={{
                  fontSize: "1rem",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "0.5rem",
                }}
              >
                <Skeleton variant="rounded" width="80" />
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: "1rem",
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <Skeleton
                variant="text"
                sx={{
                  fontSize: "1rem",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "0.5rem",
                }}
              >
                <Skeleton variant="rounded" width="80" />
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: "1rem",
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileSkeleton;
