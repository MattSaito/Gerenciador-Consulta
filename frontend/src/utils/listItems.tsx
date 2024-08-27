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
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <EventAvailableIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary="Marcar Consulta" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <MenuBookIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary="Histórico" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Logout color="primary" />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItemButton>
  </React.Fragment>
);
