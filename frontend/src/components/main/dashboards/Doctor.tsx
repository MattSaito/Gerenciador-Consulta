"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Copyright } from "@/utils/copyright";
import DashboardButton from "@/components/sub/buttons/DashboardButton";
import BookIcon from "@mui/icons-material/Book";
import Historic from "@/components/tables/AppointmentTable";

export default function Doctor() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
            }}
          >
            <DashboardButton
              icon={<BookIcon fontSize="large" />}
              title="Minhas Consultas"
              subtitle="Visualizar histórico"
              link="/auth/sign-in/dashboard/appointments"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              overflowX: "auto",
            }}
          >
            <Historic />
          </Paper>
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
}
