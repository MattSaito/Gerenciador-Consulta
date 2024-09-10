"use client";
import { useCallback, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import background from "../../../../public/a.png";
import Image from "next/image";
import ButtonOutline from "../../sub/buttons/ButtonOutline";
import { AuthService } from "@/app/service/Services";
import { defaultTheme } from "@/utils/defaultTheme";
import { ThemeProvider } from "@mui/material/styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, signInSchema } from "@/utils/schema";
import { Controller, useForm } from "react-hook-form";
import { redirect, useRouter } from "next/navigation";
import Cookies from 'js-cookie';

export default function SignIn() {
  const service = new AuthService();
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      login: "",
      password: ""
    },
    resolver: zodResolver(signInSchema),
  });

  const router = useRouter();

  const onSubmit = useCallback(
    (values: SignInSchema) => {
      service
        .login({
          login: values.login,
          password: values.password
        })
        .then(function (response) {
          setSuccess(true);
          const token = response.data.token;
          const role = response.data.role;
          Cookies.set('token', token, { sameSite: 'None', secure: true, expires: 7})
          Cookies.set('role', role);
          router.push("/auth/sign-in/dashboard");
        })
        .catch(function (error) {
          setMessage("Falha na autenticação.");
          console.error(error);
        });
    },
    [router]
  );
  return (
    <>
      <div className="sm:px-10">
        <ThemeProvider theme={defaultTheme}>
          <Grid
            container
            component="main"
            sx={{ height: "100vh" }}
            className="sm:p-[40px]"
          >
            <CssBaseline />
            <Grid item xs={12} sm={12} md={6}>
              <Image
                alt="fe"
                width={2000}
                height={2000}
                src={background}
                style={{
                  objectFit: "cover",
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
                  my: 8,
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
                  Login
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
                  sx={{ mt: 1 }}
                >
                  <Controller
                    name="login"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Endereço de Email"
                        id="email"
                        autoComplete="email"
                        error={!!errors.login}
                        helperText={errors.login?.message}
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Senha"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        {...field}
                      />
                    )}
                  />
                  <div className="my-5">
                    <ButtonOutline type="submit">Entrar</ButtonOutline>
                  </div>
                  <Grid container justifyContent={"center"}>
                    <Grid item>
                      <Link
                        className="cursor-pointer"
                        href="/auth/sign-up"
                        variant="body2"
                        underline="hover"
                      >
                        {"Não possui uma conta? Cadastre-se "}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
                <div
                  className={`${
                    success === true ? "text-blue-500" : "text-red-600"
                  } px-5 py-2`}
                >
                  {message}
                </div>
                <div className="bg-slate-100 flex flex-col"></div>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      </div>
    </>
  );
}
