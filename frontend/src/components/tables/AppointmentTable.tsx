"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../sub/dashboard/Title";
import Button from "@mui/material/Button";
import { AppointmentService } from "@/app/service/Services";
import CancelButton from "../sub/buttons/CancelButton";
import { UUID } from "crypto";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useAuth } from "@/utils/authContext";

interface Appointment {
  id: UUID;
  doctor: string;
  patient: string;
  time: string;
  date: string;
  status: string;
}

export default function AppointmentTable() {
  const { token, role } = useAuth();

  const params = {
    page: 0,
    linesPerPage: 8,
    direction: "DESC",
    orderBy: "date",
  };

  const [appointments, setAppointments] = React.useState<Appointment[]>([]);
  const [pageNumber, setPageNumber] = React.useState<number>(params.page);
  const service = new AppointmentService();

  const getAppointments = async (page: number) => {
    await service.finish(token).catch(function (error) {
      console.error(error);
    });
    await service
      .getAllForAuthenticatedUser(token, { ...params, page })
      .then(function (response) {
        setAppointments(response.data.content || []);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case "ACTIVE":
        return "Ativo";
      case "CANCELLED_BY_PATIENT":
        return "Cancelado pelo Paciente";
      case "CANCELLED_BY_DOCTOR":
        return "Cancelado pelo Médico";
      case "FINISHED":
        return "Finalizado";
      default:
        return "Desconhecido";
    }
  };

  const handleNextPage = () => {
    const nextPage = pageNumber + 1;
    setPageNumber(nextPage);
    getAppointments(nextPage);
  };

  const handlePrevPage = () => {
    const prevPage = Math.max(pageNumber - 1, 0);
    setPageNumber(prevPage);
    getAppointments(prevPage);
  };

  const handleCancel = async (id: UUID) => {
    await service
      .cancel(token, id)
      .then(function (response) {
        getAppointments(pageNumber);
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  React.useEffect(() => {
    if (token && role) getAppointments(pageNumber);
  }, [pageNumber, token, role]);

  return (
    <React.Fragment>
      <Title>Histórico de Consultas</Title>
      <Table size="medium">
        <TableHead>
          <TableRow>
            {role === "PATIENT" ? (
              <TableCell>Médico</TableCell>
            ) : (
              <TableCell>Paciente</TableCell>
            )}
            <TableCell>Horário</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              {role === "PATIENT" ? (
                <TableCell>{appointment.doctor}</TableCell>
              ) : (
                <TableCell>{appointment.patient}</TableCell>
              )}
              <TableCell>{appointment.time}</TableCell>
              <TableCell>{appointment.date}</TableCell>
              <TableCell>{getStatusLabel(appointment.status)}</TableCell>
              <TableCell>
                <CancelButton
                  style={{
                    display: appointment.status !== "ACTIVE" ? "none" : "block",
                  }}
                  disabled={appointment.status != "ACTIVE"}
                  onClick={handleCancel.bind(null, appointment.id)}
                >
                  Cancelar Consulta
                </CancelButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between">
        <Button onClick={handlePrevPage} disabled={pageNumber === 0}>
          <NavigateBeforeIcon />
        </Button>
        <Button onClick={handleNextPage}>
          <NavigateNextIcon />
        </Button>
      </div>
    </React.Fragment>
  );
}
