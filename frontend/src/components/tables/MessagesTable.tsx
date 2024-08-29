import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../sub/dashboard/Title";
import Button from "@mui/material/Button";
import { DoctorService, MessageService } from "@/app/service/Services";
import Cookies from "js-cookie";
import CancelButton from "../sub/buttons/CancelButton";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { DecodedToken } from "@/components/main/dashboards/Dashboard";
import { jwtDecode } from "jwt-decode";
import ButtonOutline from "../sub/buttons/ButtonOutline";
import { UUID } from "crypto";

interface Message {
  id: UUID;
  sender: string;
  email: string;
  phone: string;
  description: number;
}

const token = Cookies.get("token") || "";
const decodedToken: DecodedToken = jwtDecode(token);
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};
const params = {
  page: 0,
  linesPerPage: 8,
  direction: "DESC",
  orderBy: "sender",
};

export default function MessagesTable() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [pageNumber, setPageNumber] = React.useState<number>(params.page);
  const service = new MessageService();

  const getMessages = async (page: number) => {
    await service
      .getAll({ headers }, { ...params, page })
      .then(function (response) {
        setMessages(response.data.content || []);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleNextPage = () => {
    const nextPage = pageNumber + 1;
    setPageNumber(nextPage);
    getMessages(nextPage);
  };

  const handlePrevPage = () => {
    const prevPage = Math.max(pageNumber - 1, 0);
    setPageNumber(prevPage);
    getMessages(prevPage);
  };

  const handleDelete = async (id: UUID) => {
    await service.delete({ headers }, id).catch(function (error) {
      console.error(error);
    });
  };

  React.useEffect(() => {
    getMessages(pageNumber);
  }, [pageNumber]);

  return (
    <React.Fragment>
      <Title>Lista de Mensagens</Title>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell align="center">Remetente</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Telefone</TableCell>
            <TableCell align="center">Descrição</TableCell>
            <TableCell align="center">Deletar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {messages.map((message) => (
            <TableRow key={message.id}>
              <TableCell>{message.sender}</TableCell>
              <TableCell>{message.email}</TableCell>
              <TableCell>{message.phone}</TableCell>
              <TableCell>{message.description}</TableCell>
              <TableCell>
                <CancelButton onClick={handleDelete.bind(null, message.id)}>
                  Apagar Mensagem
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