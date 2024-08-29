import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../sub/dashboard/Title";
import Button from "@mui/material/Button";
import { DoctorService } from "@/app/service/Services";
import Cookies from "js-cookie";
import CancelButton from "../sub/buttons/CancelButton";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { DecodedToken } from "@/components/main/dashboards/Dashboard";
import { jwtDecode } from "jwt-decode";
import ButtonOutline from "../sub/buttons/ButtonOutline";

interface Doctor {
  username: string;
  email: string;
  specialization: string;
  docFees: number;
  CRM: string;
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
  orderBy: "username",
};

export default function DoctorTable() {
  const [doctors, setDoctors] = React.useState<Doctor[]>([]);
  const [pageNumber, setPageNumber] = React.useState<number>(params.page);
  const service = new DoctorService();

  const getDoctors = async (page: number) => {
    await service
      .getAll({ headers }, { ...params, page })
      .then(function (response) {
        setDoctors(response.data.content || []);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleNextPage = () => {
    const nextPage = pageNumber + 1;
    setPageNumber(nextPage);
    getDoctors(nextPage);
  };

  const handlePrevPage = () => {
    const prevPage = Math.max(pageNumber - 1, 0);
    setPageNumber(prevPage);
    getDoctors(prevPage);
  };

  React.useEffect(() => {
    getDoctors(pageNumber);
  }, [pageNumber]);

  return (
    <React.Fragment>
      <Title>Lista de Médicos</Title>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Especialização</TableCell>
            <TableCell>Taxa</TableCell>
            <TableCell>CRM</TableCell>
            <TableCell>Ação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {doctors.map((doctor) => (
            <TableRow key={doctor.username}>
              <TableCell>{doctor.username}</TableCell>
              <TableCell>{doctor.email}</TableCell>
              <TableCell>{doctor.specialization}</TableCell>
              <TableCell>{doctor.docFees}</TableCell>
              <TableCell>{doctor.CRM}</TableCell>
              <TableCell>
                <ButtonOutline>Editar</ButtonOutline>
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