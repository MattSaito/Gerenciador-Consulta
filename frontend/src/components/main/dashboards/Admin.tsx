"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Copyright } from "@/utils/copyright";
import DashboardButton from "@/components/sub/buttons/DashboardButton";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import GroupIcon from "@mui/icons-material/Group";
import BookIcon from "@mui/icons-material/Book";
import EmailIcon from '@mui/icons-material/Email';

export default function Admin() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12} lg={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
            }}
          >
            <DashboardButton
              icon={<GroupIcon fontSize="large"/>}
              title="Médicos Cadastrados"
              subtitle="Visualizar Médicos"
              link="/auth/sign-in/dashboard/doctors"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              overflowX: "auto",
            }}
          >
            <DashboardButton
              icon={<GroupIcon fontSize="large"/>}
              title="Pacientes Cadastrados"
              subtitle="Visualizar Pacientes"
              link="/auth/sign-in/dashboard/patients"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              overflowX: "auto",
            }}
          >
            <DashboardButton
              icon={<LocalHospitalIcon fontSize="large"/>}
              title="Adicionar Médico"
              subtitle="Cadastrar um novo médico"
              link="/auth/sign-in/dashboard/doctors/add"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              overflowX: "auto",
            }}
          >
            <DashboardButton
              icon={<BookIcon fontSize="large" />}
              title="Lista de Consultas"
              subtitle="Visualizar Consultas"
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
            <DashboardButton
              icon={<EmailIcon fontSize="large" />}
              title="Mensagens Recebidas"
              subtitle="Visualizar Mensagens"
              link="/auth/sign-in/dashboard/messages"
            />
          </Paper>
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
}
