import { Button, styled } from "@mui/material";

const CButton = ({ children, ...props }) => {
  return <CButtonStyled {...props}>{children}</CButtonStyled>;
};

const CButtonStyled = styled(Button)(
  ({
    theme,
    margin,
    width,
    padding,
    fontWeight,
    background,
    textColor,
    border,
    isDisabled, // introduced just for one reason in translate page we need to show disable styling but the button should be clickable so we need to pass this prop
    isDisabledStroked, // we have two types of disabled styling one is stroked and other is filled
  }) => ({
    display: "flex",
    width: width || "151px",
    height: "41px",
    padding: padding || "23.684px 34.615px",
    justifyContent: "center",
    alignItems: "center",
    gap: "5.466px",
    flexShrink: 0,
    borderRadius: "7px",
    background: isDisabled
      ? "rgba(32, 32, 32, 0.3)"
      : background || theme.palette.custom.black,
    color: textColor || theme.palette.common.white,
    border: isDisabled
      ? "none"
      : `1px solid ${border || theme.palette.custom.black}`,
    margin: margin || 0, // Use the provided margin or default to 0
    fontWeight: fontWeight || 700,

    "&:hover": {
      background: isDisabled
        ? "rgba(32, 32, 32, 0.3)"
        : background || theme.palette.custom.black,
      color: textColor || theme.palette.common.white,
    },

    "&:disabled": {
      background: isDisabledStroked
        ? theme.palette.common.white
        : "rgba(32, 32, 32, 0.3)",
      color: isDisabledStroked
        ? "rgba(32, 32, 32, 0.30)"
        : theme.palette.common.white,
      border: isDisabledStroked ? "1px solid #BABABA" : "none",
    },
  })
);

export default CButton;
