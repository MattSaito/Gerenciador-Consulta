import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import Logout from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import EmailIcon from "@mui/icons-material/Email";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import Cookies from "js-cookie";

export const mainItem = (
  <React.Fragment>
    <ListItemButton href="/auth/sign-in/dashboard">
      <ListItemIcon>
        <DashboardIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
  </React.Fragment>
);

export const exitItem = (
  <ListItemButton
    href="/auth/sign-in"
    onClick={() => {
      Cookies.remove("token");
      Cookies.remove("role");
    }}
  >
    <ListItemIcon>
      <Logout color="primary" />
    </ListItemIcon>
    <ListItemText primary="Sair" />
  </ListItemButton>
);

export const historicItem = (
  <ListItemButton href="/auth/sign-in/dashboard/appointments">
    <ListItemIcon>
      <MenuBookIcon color="primary" />
    </ListItemIcon>
    <ListItemText primary="Histórico" />
  </ListItemButton>
);

export const patientItem = (
  <ListItemButton href="/auth/sign-in/dashboard/book-an-appointment">
    <ListItemIcon>
      <EventAvailableIcon color="primary" />
    </ListItemIcon>
    <ListItemText primary="Marcar Consulta" />
  </ListItemButton>
);

export const adminItems = (
  <>
    <ListItemButton href="/auth/sign-in/dashboard/doctors">
      <ListItemIcon>
        <RecentActorsIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary="Médicos" />
    </ListItemButton>
    <ListItemButton href="/auth/sign-in/dashboard/patients">
      <ListItemIcon>
        <RecentActorsIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary="Pacientes" />
    </ListItemButton>
    <ListItemButton href="/auth/sign-in/dashboard/appointments">
      <ListItemIcon>
        <ContentPasteIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary="Consultas" />
    </ListItemButton>
    <ListItemButton href="/auth/sign-in/dashboard/doctors/add">
      <ListItemIcon>
        <ManageAccountsIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary="Adicionar Médico" />
    </ListItemButton>
    <ListItemButton href="/auth/sign-in/dashboard/messages">
      <ListItemIcon>
        <EmailIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary="Mensagens" />
    </ListItemButton>
  </>
);
