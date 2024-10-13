import { Link } from "react-router-dom";

import {
  Button,
  IconButton,
  InputLabel,
  Stack,
  TextField,
  styled,
} from "@mui/material";

export const StyledTextField = styled(TextField)(() => ({
  input: {
    padding: "12px 18px",
    borderRadius: "0px",
    border: "none",
  },
  borderRadius: "2.963px",

  ".MuiInputBase-root .MuiOutlinedInput-root": {
    border: "0.741px solid #6D6D6D",
  },
  ".MuiFormHelperText-root": {
    marginLeft: "0px",
  },
}));

export const StyledInputContainer = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(4),
  width: "100%",
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(6),
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  width: "100%",
  backgroundColor: theme.palette.custom.black,

  "&:hover": {
    backgroundColor: theme.palette.custom.black,
  },

  "&:disabled": {
    backgroundColor: theme.palette.custom.lightGrey,
  },
}));

export const StyledIconButton = styled(IconButton)(() => ({
  padding: "unset",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "52.222px",
  height: "37.037px",
  borderRadius: "2.963px",
  border: "0.741px solid #737373",
}));

export const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  color: theme.palette.common.black,
  textAlign: "left",
  "& .MuiInputLabel-asterisk": {
    color: theme.palette.primary.main,
  },
}));

export const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: theme.spacing(20),
}));

export const NoLinkStyled = styled(Link)(() => ({
  textDecoration: "none",
}));

export const ColoredLinkStyled = styled(Link)(({ theme, color }) => ({
  color: color || theme.palette.custom.black,
  textDecoration: "none",
  fontWeight: 700,
}));
