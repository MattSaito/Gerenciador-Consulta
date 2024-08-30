"use client";

import { useCallback, useState } from "react";
import { DoctorService, MessageService } from "@/app/service/Services";
import { Typography, TextField, Box, MenuItem, Alert } from "@mui/material";
import ButtonOutline from "../../sub/buttons/ButtonOutline";
import { useForm, Controller } from "react-hook-form";
import { DoctorSchema, doctorSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { mappedSpecializations } from "@/utils/specializations";
import Title from "@/components/sub/dashboard/Title";
import { useAuth } from "@/utils/authContext";

export default function DoctorForm() {
  const { token } = useAuth();
  const service = new DoctorService();
  const [success, setSuccess] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      username: "",
      email: "",
      specialization: "Clínica",
      docFee: 200,
      CRM: "",
      password: "",
    },
    resolver: zodResolver(doctorSchema),
  });

  const onSubmit = useCallback(
    (values: DoctorSchema) => {
      service
        .create(
          {
            username: values.username,
            email: values.email,
            specialization: values.specialization,
            docFees: values.docFee,
            CRM: values.CRM,
            password: values.password,
          },
          token
        )
        .then(function (response) {
          setSuccess(true);
          reset();
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    [reset]
  );

  return (
    <>
      <div className="flex justify-center">
        <Title>Adicionar Médico</Title>
      </div>
      <Box
        sx={{
          mt: 4,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <>
          <Box
            sx={{ mt: 1 }}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Nome"
                  autoFocus
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  {...field}
                />
              )}
            />
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
                  {...field}
                />
              )}
            />
            <Controller
              name="specialization"
              control={control}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="specialization"
                  select
                  label="Especialização"
                  autoFocus
                  error={!!errors.specialization}
                  helperText={errors.specialization?.message}
                  {...field}
                >
                  {mappedSpecializations.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="docFee"
              control={control}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Taxa de Consulta"
                  id="docFees"
                  type="number"
                  error={!!errors.docFee}
                  helperText={errors.docFee?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="CRM"
              control={control}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="CRM"
                  id="CRM"
                  error={!!errors.CRM}
                  helperText={errors.CRM?.message}
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
                  id="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  {...field}
                />
              )}
            />
            <div className="my-5 w-100">
              <ButtonOutline type="submit">Registrar</ButtonOutline>
            </div>
            <Box
              sx={{
                display: success ? "flex" : "none",
                justifyContent: "center",
                mt: 2,
              }}
            >
              <Alert severity="success" sx={{ width: "100%" }}>
                <Typography align="center">Cadastro Efetuado!</Typography>
              </Alert>
            </Box>
            <div className="bg-slate-100 flex flex-col h-0 w-0"></div>
          </Box>
        </>
      </Box>
    </>
  );
}
