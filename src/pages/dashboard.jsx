import { Button, Card, CardContent, Typography, Box } from "@mui/material";
import styled from "@emotion/styled";
import ModelCard from "../components/model-card";
import TagFacesRoundedIcon from "@mui/icons-material/TagFacesRounded";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import InventoryIcon from "@mui/icons-material/Inventory";
import RectangleIcon from "@mui/icons-material/Rectangle";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

const models = [
  {
    name: "Card 1",
    link: "https://www.bytecorp.io/work/face-recognition/",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    color: "blue",
    icon: <TagFacesRoundedIcon />,
  },
  {
    name: "Card 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    link: "https://www.bytecorp.io/work/automated-meter-reading/",
    icon: <CameraAltIcon />,
  },
  {
    name: "Card 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elitAnalysis",
    link: "https://www.bytecorp.io/work/object-detection/",
    icon: <InventoryIcon />,
  },
  {
    name: "Card 4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    link: "https://www.bytecorp.io/work/license-plate-recognition/",
    icon: <RectangleIcon />,
  },
];

const Dashboard = () => {
  const theme = useTheme();
  const isLaptop = useMediaQuery(theme.breakpoints.up("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  return (
    <StyledBox>
      <Box>
        <Card variant="outlined">
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: "16px", sm: "0" },
              }}
            >
              <Box>
                <Typography
                  variant="h5"
                  component="div"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "#3A7DCA" }}
                >
                  Details
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  backgroundColor: "#333",
                  width: { xs: "100%", sm: "auto" },
                }}
                onClick={() => {
                  console.log('view details clicked')
                }}
              >
                View Details
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <Typography sx={{ fontWeight: "bold" }}>
          Portal Functionalities
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: isLaptop ? "row" : "column",
            flexWrap: isLaptop ? "wrap" : "nowrap",
            gap: 8,
          }}
        >
          {models.map((model, id) => (
            <ModelCard
              model={model}
              key={id}
              isLaptop={isLaptop}
              isMobile={isMobile}
            />
          ))}
        </Box>
      </Box>
    </StyledBox>
  );
};

export default Dashboard;

const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  padding: "30px",
  width: "100%",
}));
