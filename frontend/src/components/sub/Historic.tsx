import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { IconButton, Typography } from "@mui/material";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import BookIcon from "@mui/icons-material/Book";

export default function Historic() {
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
        <IconButton
          size="large"
          style={{
            backgroundColor: "#478DF7",
            color: "white",
            borderRadius: 8,
          }}
        >
          <BookIcon fontSize="large" />
        </IconButton>
        <Typography
          variant="subtitle1"
          style={{ marginTop: theme.spacing(1) }}
          className="font-helvetica"
        >
          Minhas Consultas
        </Typography>
        <Typography
          variant="caption"
          color="primary"
          style={{ marginTop: theme.spacing(1) }}
        >
          Visualizar histórico
        </Typography>
      </div>
    </React.Fragment>
  );
}
