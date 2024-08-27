import { grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#478df7",
      light: "#FFFFFF",
    },
    secondary: {
      main: grey[50],
    },
  },
});
