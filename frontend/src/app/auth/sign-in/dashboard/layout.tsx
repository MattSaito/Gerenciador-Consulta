"use client";

import DashBoardBar from "@/components/main/DashboardBar";
import { defaultTheme } from "@/utils/defaultTheme";
import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline } from "@mui/material";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <DashBoardBar />
          {children}
        </Box>
      </ThemeProvider>
    </>
  );
}
