"use client";
import { Container, Grid, Paper } from "@mui/material";
import AppointmentTable from "../tables/AppointmentTable";
import { DecodedToken } from "../main/dashboards/Dashboard";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import DetailedAppointmentTable from "../tables/DetailedAppointmentTable";
const token = Cookies.get("token") || "";
const decodedToken: DecodedToken = jwtDecode(token);

export default function AppointmentList() {
  const { role } = decodedToken;
  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
      <Grid container>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              overflowX: "auto",
            }}
          >
            {" "}
            {role === "ADMIN" ? <DetailedAppointmentTable /> : <AppointmentTable />}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}