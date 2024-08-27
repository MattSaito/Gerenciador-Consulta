"use client";

import { useCallback, useState } from "react";
import { MessageService } from "@/app/service/Services";
import { Typography, TextField, Box } from "@mui/material";
import ButtonOutline from "../sub/buttons/ButtonOutline";
import { useForm, Controller } from "react-hook-form";
import { ContactSchema, contactSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ContactForm() {
  const service = new MessageService();
  const [success, setSuccess] = useState<boolean>(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      sender: "",
      email: "",
      phone: "",
      message: "",
    },
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = useCallback(
    (values: ContactSchema) => {
      service
        .insert({
          sender: values.sender,
          email: values.email,
          phone: values.phone,
          description: values.message,
        })
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
      <Box
        sx={{
          mt: 4,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {!success ? (
          <>
            <Typography component="h1" variant="h5">
              Para entrar em contato, preencha o formulário.
            </Typography>
            <Box
              sx={{ mt: 1 }}
              component="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="sender"
                control={control}
                render={({ field }) => (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="sender"
                    label="Nome"
                    autoFocus
                    error={!!errors.sender}
                    helperText={errors.sender?.message}
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
                    {...field}
                  />
                )}
              />
              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Mensagem"
                    id="message"
                    autoComplete="current-password"
                    error={!!errors.message}
                    helperText={errors.message?.message}
                    {...field}
                  />
                )}
              />
              <div className="my-5 w-100">
                <ButtonOutline type="submit">Cadastrar</ButtonOutline>
              </div>
              <div className="bg-slate-100 flex flex-col h-0 w-0"></div>
            </Box>
          </>
        ) : (
          <Typography component="h1" variant="h3" justifyContent={"center"}>
            Mensagem Enviada! &#129309;
          </Typography>
        )}
      </Box>
    </>
  );
}
