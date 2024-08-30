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
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { DecodedToken } from "@/components/main/dashboards/Dashboard";
import { jwtDecode } from "jwt-decode";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import CancelButton from "../sub/buttons/CancelButton";
import { useState } from "react";

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
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(params.page);
  const service = new DoctorService();
  const [message, setMessage] = useState<string>("");
  const [messageContent, setMessageContent] = useState<string>("");
  const [searchEmail, setSearchEmail] = useState<string>("");
  const [openNotFoundDialog, setOpenNotFoundDialog] = useState<boolean>(false);

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

  const getDoctorByEmail = async (email: string) => {
    await service
      .getByEmail({ headers }, email)
      .then(function (response) {
        setDoctors([response.data]);
      })
      .catch(function (error) {
        setMessage("Email não encontrado");
        setMessageContent("O email inserido não corresponde a nenhum médico.");
        getDoctors(pageNumber);
        setOpenNotFoundDialog(true);
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

  const handleSearch = () => {
    getDoctorByEmail(searchEmail);
  };

  const handleDelete = async (email: string) => {
    service
      .delete({ headers }, email)
      .then(function (response) {
        getDoctors(pageNumber);
      })
      .catch(function (error) {
        setMessage("Falha ao deletar");
        setMessageContent("O médico possui consultas ativas.");
        setOpenNotFoundDialog(true);
      });
  };

  React.useEffect(() => {
    getDoctors(pageNumber);
  }, [pageNumber]);

  return (
    <React.Fragment>
      <Title>Lista de Médicos</Title>
      <Box sx={{ display: "flex", mb: 2, mt: 2 }}>
        <TextField
          placeholder="Email"
          size="small"
          sx={{ ml: 1, width: "50%", mr: 1 }}
          inputProps={{ "aria-label": "search by email" }}
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <Button
          variant="contained"
          size="medium"
          sx={{ ml: 1, textTransform: "none" }}
          onClick={handleSearch}
        >
          Buscar
        </Button>
      </Box>
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
                <CancelButton onClick={() => handleDelete(doctor.email)}>
                  Excluir
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
      <Dialog
        open={openNotFoundDialog}
        onClose={() => setOpenNotFoundDialog(false)}
      >
        <DialogTitle>{message}</DialogTitle>
        <DialogContent>{messageContent}</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNotFoundDialog(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
