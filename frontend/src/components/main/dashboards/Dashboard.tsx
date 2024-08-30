"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Patient from "./Patient";
import Doctor from "./Doctor";
import Admin from "./Admin";
import { useAuth } from "@/utils/authContext";

export default function Dashboard() {
  const role = useAuth().role;
  let dashboardContent = null;

  switch (role) {
    case "PATIENT":
      dashboardContent = <Patient />;
      break;
    case "DOCTOR":
      dashboardContent = <Doctor />;
      break;
    case "ADMIN":
      dashboardContent = <Admin />;
      break;
    default:
      break;
  }

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Toolbar />
      {dashboardContent}
    </Box>
  );
}
