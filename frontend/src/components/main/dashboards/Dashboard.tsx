"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Cookies from "js-cookie";
import Patient from "./Patient";
import Doctor from "./Doctor";
import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
    role: string;
  }

const token = Cookies.get("token") || "";
const decodedToken: DecodedToken = jwtDecode(token);

  

export default function Dashboard() {
    const { role } = decodedToken;
  let dashboardContent = null;

  switch (role) {
    case "PATIENT":
      dashboardContent = <Patient />;
      break;
    case "DOCTOR":
      dashboardContent = <Doctor />;
      break;
    case "ADMIN":
      dashboardContent = <div></div>;
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