"use client";

import DashBoardBar from "@/components/sub/dashboard/DashboardBar";
import { AuthProvider } from "@/utils/authContext";
import { defaultTheme } from "@/utils/defaultTheme";
import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline } from "@mui/material";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthProvider>
        <ThemeProvider theme={defaultTheme}>
          <Box sx={{ display: "flex", width: "100%", height: "100vh" }}>
            <DashBoardBar />
            <Box sx={{ flex: 1, overflow: "auto" }}>
              <CssBaseline />
              {children}
            </Box>
          </Box>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}
