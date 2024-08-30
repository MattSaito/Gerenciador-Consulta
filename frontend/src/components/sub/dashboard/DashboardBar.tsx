import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Image from "next/image";
import logo from "../../../../public/blueLogo.svg";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@/utils/authContext";
import { AuthService } from "@/app/service/Services";
import {
  mainItem,
  patientItem,
  historicItem,
  adminItems,
  exitItem,
} from "@/utils/listItems";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function DashBoardBar() {
  const [open, setOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const authService = new AuthService();
  const { token, role } = useAuth();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
  };

  useEffect(() => {
    if (token && role)
      authService
        .current(token)
        .then(function (response) {
          setUsername(response.data.username);
        })
        .catch(function (error) {
          console.error(error);
        });
  }, [token, role]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <AppBar open={open}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src={logo}
                  alt="logo"
                  width={70}
                  height={70}
                  priority={true}
                />
              </Link>
              <h1 className="text-black-600 ml-2 text-lg font-sans">
                Global Hospital
              </h1>
            </div>
          </Typography>
          <IconButton
            color="inherit"
            onClick={handleLogout}
            href="/auth/sign-in"
          >
            <LogoutIcon fontSize="large" className="hidden sm:block" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <AccountCircleIcon color="primary" className="ml-2" />
          <Typography
            variant="body1"
            noWrap
            sx={{ flexGrow: 1, ml: 2, whiteSpace: "pre-wrap", maxWidth: 150 }}
          >
            {username}
          </Typography>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {mainItem}
          {role === "PATIENT" ? patientItem : null}
          {role != "ADMIN" ? historicItem : null}
          {role === "ADMIN" ? adminItems : null}
          {exitItem}
        </List>
      </Drawer>
    </>
  );
}
