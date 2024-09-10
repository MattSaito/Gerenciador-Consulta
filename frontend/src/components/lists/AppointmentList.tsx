"use client";
import { Container, Grid, Paper } from "@mui/material";
import AppointmentTable from "../tables/AppointmentTable";
import DetailedAppointmentTable from "../tables/DetailedAppointmentTable";
import { useAuth } from "@/utils/authContext";

export default function AppointmentList() {
  const { role }  = useAuth();
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
