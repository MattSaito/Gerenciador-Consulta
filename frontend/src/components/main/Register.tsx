"use client";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import background from "../../../public/sign-up.svg";
import Image from "next/image";
import { grey } from "@mui/material/colors";
import ButtonOutline from "../sub/ButtonOutline";
import logo from "../../../public/logo.svg";
import { AuthService } from "@/app/service/Services";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#478df7",
    },
    secondary: {
      main: grey[50],
    },
  },
});

export default function SignUp() {
  const service = new AuthService();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };
  return (
    <>
      <nav
        className={
          "w-full bg-white fixed top-0 z-30 transition-all px-5 sm:grid sm:grid-flow-col py-5 sm:py-4 flex-col justify-normal"
        }
      >
        <div className="col-start-1  col-end-2 flex items-center h-10 w-auto justify-between sm:justify-normal">
          <div className="flex items-center">
            <Link href="/">
              <Image src={logo} alt="logo" width={70} height={70} />
            </Link>
            <h1 className="text-black-600 ml-2 text-lg">Global Hospital</h1>
          </div>
        </div>
      </nav>
      <div className="sm:px-10">
        <ThemeProvider theme={defaultTheme}>
          <Grid container component="main" className="sm:p-[40px]">
            <CssBaseline />
            <Grid item xs={12} sm={12} md={6}>
              <Image
                alt="fe"
                width={2000}
                height={2000}
                src={background}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              component={Paper}
              square
              elevation={6}
            >
              <Box
                sx={{
                  mt: 4,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "#71BCFE" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Crie sua conta
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Nome"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Sobrenome"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Endereço de Email"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="CPF"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Telefone (DDD + número)"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />{" "}
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Senha"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="w-100 my-5">
                    <ButtonOutline type="submit">Cadastrar</ButtonOutline>
                  </div>
                  <Grid container>
                    <Grid item>
                      <Link
                        className="cursor-pointer"
                        href="/sign-in"
                        variant="body2"
                        underline="hover"
                      >
                        {"Já possui uma conta? Clique aqui "}
                      </Link>
                    </Grid>
                    <div className="bg-slate-100 flex flex-col h-0 w-0"></div>
                  </Grid>
                </Box>
              </Box>
              <div
                className={`${
                  success === "CREATED" ? "text-blue-500" : "text-red-600"
                } px-5 py-2`}
              >
                {message}
              </div>
            </Grid>
          </Grid>
        </ThemeProvider>
      </div>
    </>
  );
}
