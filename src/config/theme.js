import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
  typography: {
    fontFamily: ["DM Sans", "sans-serif"].join(","),
  },

  palette: {
    primary: {
      main: "#303030",
      contrastText: "#4B8CBB",
    },
    common: {
      white: "#FFFFFF",
      black: "#494949",
    },
    custom: {
      black: "#202020",
      teal: "#4B8CBB",
      lightGrey: "#909090",
      borderGrey: "#DFDFDF",
      primaryGrey: "#FCFCFC",
      primaryDark: "#646464",
      lightContrast: "#EEF5FF",
    },
  },
  spacing: (factor) => `${0.125 * factor}rem`, // factor of 1 means 2px or 0.125rem
});
