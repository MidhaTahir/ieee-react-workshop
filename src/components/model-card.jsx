import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  styled,
} from "@mui/material";
import PropTypes from "prop-types";
const ModelCard = ({ model, isLaptop, isMobile }) => {
  return (
    <StyledCard variant="outlined" sx={{ width: isLaptop ? "49%" : "100%" }}>
      <CardContent>
        {!isMobile ? model.icon : ""}
        <Box
          sx={{
            display: "flex",
            alignItems: {
              sm: "center",
              xs: "flex-start",
            },
            justifyContent: "space-between",
            flexDirection: { sm: "row", xs: "column" },
            gap: { xs: 10, sm: 0 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              width: "60%",
              gap: "10px",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", color: "#333" }}
            >
              {model.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {model.description}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#36BFB6",
              color: "#36BFB6",
              backgroundColor: "#ffffff",
              width: { xs: "100%", sm: "auto" },
              "&:hover": {
                borderColor: "#36BFB6",
                backgroundColor: "#f0f8f8",
              },
            }}
            onClick={() => window.open(model.link, "_blank")}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

ModelCard.propTypes = {
  model: PropTypes.object.isRequired,
  isLaptop: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default ModelCard;

const StyledCard = styled(Card)({
  backgroundColor: "#f7fdfd",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});
