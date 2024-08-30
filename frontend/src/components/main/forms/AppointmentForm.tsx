"use client";

import { useEffect, useState } from "react";
import { AppointmentService, DoctorService } from "@/app/service/Services";
import { Typography, TextField, Box, MenuItem } from "@mui/material";
import ButtonOutline from "../../sub/buttons/ButtonOutline";

import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import Cookies from "js-cookie";
import {
  mappedSpecializations,
  specializations,
} from "@/utils/specializations";

const eightAM = dayjs().set("hour", 8).startOf("hour");
const sixPM = dayjs().set("hour", 18).startOf("hour");

const token = Cookies.get("token");

export default function AppointmentForm() {
  const doctorService = new DoctorService();
  const appointmentService = new AppointmentService();
  const [doctors, setDoctors] = useState<{ value: any }[]>([]);
  const [success, setSuccess] = useState<boolean>(false);
  const [specialization, setSpecialization] = useState<string>("Clínica");
  const [message, setMesssage] = useState<string>("Marcar Consulta");
  const [color, setColor] = useState<string>("black");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState(dayjs());
  const [time, setTime] = useState(eightAM);

  const isWeekend = (date: Dayjs) => {
    const day = date.day();

    return day === 0 || day === 6;
  };

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const loadDoctors = async (specialization: string) => {
    const response = doctorService
      .getAllBySpecialization(specialization, {
        headers,
      })
      .then(function (response) {
        if (response.data && Array.isArray(response.data.content)) {
          const doctorsList = response.data.content.map(
            (doctor: { username: any }) => ({
              value: doctor.username,
            })
          );
          setDoctors(doctorsList);
        } else {
          setDoctors([]);
        }
      });
  };

  useEffect(() => {
    const initialDoctors = [].map((value) => ({ value }));
    setDoctors(initialDoctors);
  }, []);

  useEffect(() => {
    loadDoctors(specialization);
  }, [specialization]);

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    appointmentService
      .insert(
        {
          doctor: doctor,
          date: date.format("DD/MM/YYYY"),
          time: time.format("HH:mm"),
        },
        { headers }
      )
      .then(function (response) {
        setSpecialization("Clínica");
        setDoctor("");
        setDate(dayjs());
        setTime(eightAM);
        setMesssage("Consulta marcada com sucesso!");
        setColor("primary");
        setSuccess(true);
      })
      .catch(function (error) {
        console.error(error);
        setMesssage("Falha ao marcar consulta!");
        setSuccess(false);
        setColor("red");
      });
  };

  return (
    <>
      <Typography
        component="h2"
        variant="h6"
        color={color}
        gutterBottom
        className="flex justify-center"
      >
        {message}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <Box sx={{ mt: 1 }} component="form" onSubmit={onSubmit} noValidate>
          <TextField
            margin="normal"
            select
            required
            fullWidth
            label="Especialização"
            disabled={success}
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            autoFocus
          >
            {mappedSpecializations.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="normal"
            fullWidth
            label="Médico"
            id="doctor"
            disabled={success}
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            select
          >
            {doctors.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              minDate={dayjs()}
              maxDate={dayjs().add(1, "year")}
              shouldDisableDate={isWeekend}
              format="DD/MM/YYYY"
              value={date}
              disabled={success}
              onChange={(newDate) => setDate(dayjs(newDate) || dayjs())}
              slotProps={{
                textField: {
                  margin: "normal",
                  fullWidth: true,
                },
              }}
            />

            <TimePicker
              format="hh:mm"
              minutesStep={30}
              timeSteps={{ minutes: 30 }}
              minTime={eightAM}
              maxTime={sixPM}
              ampm={false}
              value={time}
              disabled={success}
              onChange={(newTime) => setTime(newTime || dayjs())}
              slotProps={{
                textField: {
                  margin: "normal",
                  fullWidth: true,
                },
              }}
            />
          </LocalizationProvider>
          <div className="my-5 w-100">
            <ButtonOutline type="submit" disabled={success}>
              Enviar
            </ButtonOutline>
          </div>
        </Box>
      </Box>
    </>
  );
}
