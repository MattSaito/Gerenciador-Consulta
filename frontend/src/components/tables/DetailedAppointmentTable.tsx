import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../sub/dashboard/Title";
import Button from "@mui/material/Button";
import { AppointmentService } from "@/app/service/Services";
import Cookies from "js-cookie";
import CancelButton from "../sub/buttons/CancelButton";
import { UUID } from "crypto";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { DecodedToken } from "@/components/main/dashboards/Dashboard";
import { jwtDecode } from "jwt-decode";

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

const token = Cookies.get("token") || "";
const decodedToken: DecodedToken = jwtDecode(token, { header: true });
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};
const params = {
  page: 0,
  linesPerPage: 8,
  direction: "DESC",
  orderBy: "date",
};

export default function DetailedAppointmentTable() {
  const [detailedAppointments, setDetailedAppointments] = React.useState<
    DetailedAppointment[]
  >([]);
  const [pageNumber, setPageNumber] = React.useState<number>(params.page);
  const service = new AppointmentService();
  const { role } = decodedToken;

  const getAppointments = async (page: number) => {
    await service.finish({ headers }).catch(function (error) {
      console.error(error);
    });
    await service
      .getAll({ headers }, { ...params, page })
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
    getAppointments(pageNumber);
  }, [pageNumber]);

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