import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../sub/dashboard/Title";
import Button from "@mui/material/Button";
import { PatientService } from "@/app/service/Services";
import Cookies from "js-cookie";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { DecodedToken } from "@/components/main/dashboards/Dashboard";
import { jwtDecode } from "jwt-decode";

interface Patient {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cpf: string;
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
  orderBy: "firstName",
};

export default function PatientTable() {
  const [patients, setPatients] = React.useState<Patient[]>([]);
  const [pageNumber, setPageNumber] = React.useState<number>(params.page);
  const service = new PatientService();

  const getPatients = async (page: number) => {
    await service
      .getAll({ headers }, { ...params, page })
      .then(function (response) {
        console.log(response.data.content);
        setPatients(response.data.content || []);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleNextPage = () => {
    const nextPage = pageNumber + 1;
    setPageNumber(nextPage);
    getPatients(nextPage);
  };

  const handlePrevPage = () => {
    const prevPage = Math.max(pageNumber - 1, 0);
    setPageNumber(prevPage);
    getPatients(prevPage);
  };

  React.useEffect(() => {
    getPatients(pageNumber);
  }, [pageNumber]);

  return (
    <React.Fragment>
      <Title>Lista de Pacientes</Title>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Primeiro Nome</TableCell>
            <TableCell>Sobrenome</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Telefone</TableCell>
            <TableCell>CPF</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.email}>
              <TableCell>{patient.firstName}</TableCell>
              <TableCell>{patient.lastName}</TableCell>
              <TableCell>{patient.email}</TableCell>
              <TableCell>{patient.phone}</TableCell>
              <TableCell>{patient.cpf}</TableCell>
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