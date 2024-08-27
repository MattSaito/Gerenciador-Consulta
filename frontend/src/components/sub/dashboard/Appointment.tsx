import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import Link from "next/link";

export default function Appointment() {
  const theme = useTheme();
  return (
    <React.Fragment>
      <div
        style={{
          width: "100%",
          flexGrow: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Link href="/auth/sign-in/dashboard/book-an-appointment">
          <IconButton
            size="large"
            style={{
              backgroundColor: "#478DF7",
              color: "white",
              borderRadius: 8,
            }}
          >
            <LibraryAddIcon fontSize="large" />
          </IconButton>
        </Link>
        <Typography
          variant="subtitle1"
          style={{ marginTop: theme.spacing(1) }}
          className="font-helvetica"
        >
          Agendar Minha Consulta
        </Typography>
        <Typography
          variant="caption"
          color="primary"
          style={{ marginTop: theme.spacing(1) }}
        >
          <Link href="/auth/sign-in/dashboard/book-an-appointment">
            Agendar Consulta
          </Link>
        </Typography>
      </div>
    </React.Fragment>
  );
}
