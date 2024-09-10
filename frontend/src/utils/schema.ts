import { z } from "zod";
import { isValidCPF, isValidPhoneNumber } from "./validations";
import { specializations } from "./specializations";

export const appointmentSchema = z.object({
  specialization: z.string(),
  doctor: z.string(),
  date: z.date(),
  time: z.string(),
});

export const signUpSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "O nome deve conter ao menos 2 caracteres" }),
  lastName: z
    .string()
    .min(2, { message: "O sobrenome deve conter ao menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  cpf: z.string().refine((cpf) => isValidCPF(cpf), { message: "CPF inválido" }),
  phone: z.string().refine((phoneNumber) => isValidPhoneNumber(phoneNumber), {
    message: "Número de telefone inválido.",
  }),
  password: z
    .string()
    .min(5, { message: "A senha precisa conter ao menos 5 caracteres" }),
});

export const doctorSchema = z.object({
  username: z
    .string()
    .min(2, { message: "O nome deve conter ao menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(5, { message: "A senha precisa conter ao menos 5 caracteres" }),
  specialization: z.string(),
  docFee: z.coerce.number().min(40, { message: "A taxa mínima é 40"}).max(1000, { message: "A taxa máxima é 1000"}),
  CRM: z.string().regex(/^\d{6}[a-zA-Z]{2}$/, { message: "CRM inválido" }),
});

export const signInSchema = z.object({
  login: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(5, { message: "A senha precisa conter ao menos 5 caracteres" }),
});

export const contactSchema = z.object({
  sender: z
    .string()
    .min(2, { message: "O nome deve conter ao menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().refine((phoneNumber) => isValidPhoneNumber(phoneNumber), {
    message: "Número de telefone inválido.",
  }),
  message: z
    .string()
    .min(20, { message: "A mensagem deve conter no mínimo 20 caracteres" }),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
export type SignInSchema = z.infer<typeof signInSchema>;
export type ContactSchema = z.infer<typeof contactSchema>;
export type AppointmentSchema = z.infer<typeof appointmentSchema>;
export type DoctorSchema = z.infer<typeof doctorSchema>;
