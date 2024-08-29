import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { IconButton, Typography } from "@mui/material";
import BookIcon from '@mui/icons-material/Book';
import Link from "next/link";

export default function HistoricButton() {
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
        <Link href="/auth/sign-in/dashboard/my-appointments">
        <IconButton
          size="large"
          style={{ backgroundColor: "#478DF7", color: "white", borderRadius: 8 }}
        >
          <BookIcon fontSize="large" />
        </IconButton>
        </Link>
        <Typography variant="subtitle1"  style={{ marginTop: theme.spacing(1) }} className="font-helvetica">
          Minhas Consultas
        </Typography>
        <Typography variant="caption" color="primary" style={{ marginTop: theme.spacing(1) }}>
        <Link href="/auth/sign-in/dashboard/my-appointments">Visualizar Histórico</Link>
        </Typography>
      </div>
    </React.Fragment>
  );
}