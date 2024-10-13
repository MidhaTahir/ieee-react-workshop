import { SnackbarProvider } from "notistack";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./config/theme";
import AuthProvider from "./providers/auth-provider";
import AppRouter from "./router/app-router";

function App() {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      autoHideDuration={3000}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
      </ThemeProvider>
    </SnackbarProvider>
  );
}

export default App;
