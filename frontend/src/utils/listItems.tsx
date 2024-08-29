import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import Logout from "@mui/icons-material/Logout";
export const mainListItems = (
  <React.Fragment>
    <ListItemButton href="/auth/sign-in/dashboard">
      <ListItemIcon>
        <DashboardIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton href="/auth/sign-in/dashboard/my-appointments">
      <ListItemIcon>
        <MenuBookIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary="Histórico" />
    </ListItemButton>
    <ListItemButton href="/auth/sign-in">
      <ListItemIcon>
        <Logout color="primary" />
      </ListItemIcon>
      <ListItemText primary="Sair"  />
    </ListItemButton>
  </React.Fragment>
);

export const patientItem = (
  <ListItemButton href="/auth/sign-in/dashboard/book-an-appointment">
  <ListItemIcon>
    <EventAvailableIcon color="primary" />
  </ListItemIcon>
  <ListItemText primary="Marcar Consulta" />
</ListItemButton>
)