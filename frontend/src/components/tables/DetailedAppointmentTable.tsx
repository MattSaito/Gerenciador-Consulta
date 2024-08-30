import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../sub/dashboard/Title";
import Button from "@mui/material/Button";
import { AppointmentService } from "@/app/service/Services";

import { UUID } from "crypto";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import { useAuth } from "@/utils/authContext";

interface DetailedAppointment {
  id: UUID;
  doctor: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  time: string;
  date: string;
  status: string;
}

export default function DetailedAppointmentTable() {
  const { token } = useAuth();

  const params = {
    page: 0,
    linesPerPage: 8,
    direction: "DESC",
    orderBy: "date",
  };
  const [detailedAppointments, setDetailedAppointments] = React.useState<
    DetailedAppointment[]
  >([]);
  const [pageNumber, setPageNumber] = React.useState<number>(params.page);
  const service = new AppointmentService();

  const getAppointments = async (page: number) => {
    await service.finish(token).catch(function (error) {
      console.error(error);
    });
    await service
      .getAll(token, { ...params, page })
      .then(function (response) {
        setDetailedAppointments(response.data.content || []);
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

  React.useEffect(() => {
    if (token) getAppointments(pageNumber);
  }, [pageNumber, token]);

  return (
    <React.Fragment>
      <Title>Lista de Consultas</Title>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Sobrenome</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Telefone</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Hora</TableCell>
            <TableCell>Médico</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {detailedAppointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{appointment.firstName}</TableCell>
              <TableCell>{appointment.lastName}</TableCell>
              <TableCell>{appointment.email}</TableCell>
              <TableCell>{appointment.phone}</TableCell>
              <TableCell>{appointment.date}</TableCell>
              <TableCell>{appointment.time}</TableCell>
              <TableCell>{appointment.doctor}</TableCell>
              <TableCell>{getStatusLabel(appointment.status)}</TableCell>
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
