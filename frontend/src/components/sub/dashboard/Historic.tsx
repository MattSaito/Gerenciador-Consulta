import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import Button from "@mui/material/Button";
import { AppointmentService } from "@/app/service/Services";
import Cookies from "js-cookie";
import CancelButton from "../buttons/CancelButton";
import { UUID } from "crypto";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { DecodedToken } from "@/components/main/dashboards/Dashboard";
import { jwtDecode } from "jwt-decode";

interface Appointment {
  id: UUID;
  doctor: string;
  patient: string;
  time: string;
  date: string;
  status: string;
}

const token = Cookies.get("token") || "";
const decodedToken : DecodedToken = jwtDecode(token);
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

export default function Historic() {
  const [appointments, setAppointments] = React.useState<Appointment[]>([]);
  const [pageNumber, setPageNumber] = React.useState<number>(params.page);
  const service = new AppointmentService();
  const { role } = decodedToken;

  const getAppointments = async (page: number) => {
    await service.finish({ headers }).catch(function (error) {
      console.error(error);
    });
    await service
      .getAllForAuthenticatedUser({ headers }, { ...params, page })
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
      .cancel({ headers }, id)
      .then(function (response) {
        getAppointments(pageNumber);
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  React.useEffect(() => {
    getAppointments(pageNumber);
  }, [pageNumber]);

  return (
    <React.Fragment>
      <Title>Consultas Recentes</Title>
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
              {role === "PATIENT" ? (<TableCell>{appointment.doctor}</TableCell>) :
              (<TableCell>{appointment.patient}</TableCell>)}
              <TableCell>{appointment.time}</TableCell>
              <TableCell>{appointment.date}</TableCell>
              <TableCell>{getStatusLabel(appointment.status)}</TableCell>
              <TableCell>
                <CancelButton
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