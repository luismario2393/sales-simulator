import { createTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: grey[300],
    },
    primary: {
      main: "#4a148c",
    },
    secondary: {
      main: "#19857b",
    },

    error: {
      main: red.A400,
    },
  },

  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {},
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          padding: "8px 16px",
          fontSize: "14px",
          fontWeight: "bold",
          cursor: "pointer",
          width: "300px",
        },
      },
    },
  },
});
