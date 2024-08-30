import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../sub/dashboard/Title";
import Button from "@mui/material/Button";
import { PatientService } from "@/app/service/Services";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "@/utils/authContext";

interface Patient {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cpf: string;
}

const params = {
  page: 0,
  linesPerPage: 8,
  direction: "DESC",
  orderBy: "firstName",
};

export default function PatientTable() {
  const { token } = useAuth();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(params.page);
  const [message, setMessage] = useState<string>("");
  const [messageContent, setMessageContent] = useState<string>("");
  const service = new PatientService();
  const [searchEmail, setSearchEmail] = useState<string>("");
  const [openNotFoundDialog, setOpenNotFoundDialog] = useState<boolean>(false);

  const getPatients = async (page: number) => {
    await service
      .getAll(token, { ...params, page })
      .then(function (response) {
        setPatients(response.data.content || []);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const getPatientByEmail = async (email: string) => {
    await service
      .getByEmail(token, email)
      .then(function (response) {
        setPatients([response.data]);
      })
      .catch(function (error) {
        setMessage("Email não encontrado");
        setMessageContent(
          "O email inserido não corresponde a nenhum paciente."
        );
        getPatients(pageNumber);
        setOpenNotFoundDialog(true);
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

  const handleSearch = () => {
    getPatientByEmail(searchEmail);
  };

  React.useEffect(() => {
    if (token) getPatients(pageNumber);
  }, [pageNumber, token]);

  return (
    <React.Fragment>
      <Title>Lista de Pacientes</Title>
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
          variant="outlined"
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
