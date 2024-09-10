"use client";
import { useCallback, useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import background from "../../../../public/sign-up.svg";
import Image from "next/image";
import ButtonOutline from "../../sub/buttons/ButtonOutline";
import { AuthService } from "@/app/service/Services";
import { defaultTheme } from "@/utils/defaultTheme";
import { ThemeProvider } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { SignUpSchema, signUpSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignUp() {
  const service = new AuthService();
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      cpf: "",
      phone: "",
      password: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = useCallback((values: SignUpSchema) => {
    service
      .register({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        cpf: values.cpf,
        phone: values.phone,
        password: values.password,
      })
      .then(function (response) {
        setSuccess(true);
        setSubmitted(true);
        setMessage("Conta Criada!");
        reset();
      })
      .catch(function (error) {
        setSuccess(false);
        if (error.response.status === 400) setMessage("Os dados fornecidos estão em uso.")
        else setMessage("Falha na criação da conta.")
      });
  }, [reset]);

  return (
    <>
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
                { !submitted? (
                <><Typography component="h1" variant="h5">
                    Crie sua conta
                  </Typography><Box sx={{ mt: 1 }} component="form" onSubmit={handleSubmit(onSubmit)}>
                      <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="firstName"
                            label="Nome"
                            autoFocus
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                            {...field} />
                        )} />
                      <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="lastName"
                            label="Sobrenome"
                            autoFocus
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                            {...field} />
                        )} />
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Endereço de Email"
                            id="email"
                            autoComplete="email"
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            {...field} />
                        )} />
                      <Controller
                        name="cpf"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="cpf"
                            label="CPF"
                            autoFocus
                            error={!!errors.cpf}
                            helperText={errors.cpf?.message}
                            inputProps={{ maxLength: 11 }}
                            {...field} />
                        )} />
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="phone"
                            label="Telefone (DDD + número)"
                            autoFocus
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                            inputProps={{ maxLength: 11 }}
                            {...field} />
                        )} />
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
                            {...field} />
                        )} />
                      <div className="my-5 w-100">
                        <ButtonOutline type="submit">Cadastrar</ButtonOutline>
                      </div>
                      <Grid container>
                        <Grid item>
                          <Link
                            className="cursor-pointer"
                            href="/auth/sign-in"
                            variant="body2"
                            underline="hover"
                          >
                            {"Já possui uma conta? Clique aqui "}
                          </Link>
                        </Grid>
                      </Grid>
                    </Box>
                    <div
                className={`${
                  success === true ? "text-blue-500" : "text-red-600"
                } px-5 py-5`} 
              >
                {message}
              </div>
              <div className="bg-slate-100 flex flex-col h-0 w-0"></div>
                    </>
                ) : (
                  <Typography component="h1" variant="h4" className="mb-6">
                    Conta criada!
                  </Typography>
                )
}
              </Box>
              
            </Grid>
          </Grid>
        </ThemeProvider>
      </div>
    </>
  );
}
