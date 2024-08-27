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
import CreateIcon from "@mui/icons-material/Create";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

export default function Appointment() {
  const theme = useTheme();
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
          onClick={handleOpenModal}
        >
          <LibraryAddIcon fontSize="large" />
        </IconButton>
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
          Agendar Consulta
        </Typography>
      </div>

      <Dialog
        open={openModal}
        disableScrollLock
        autoFocus
        onClose={handleCloseModal}
      >
        <DialogTitle>Agendar Consulta</DialogTitle>
        <DialogContent>
          <form>
            <TextField label="Doctor" fullWidth margin="normal" />
            <TextField
              placeholder="Date"
              type="date"
              fullWidth
              margin="normal"
            />
            <TextField label="Time" type="time" fullWidth margin="normal" />

            <Button
              variant="contained"
              color="primary"
              onClick={handleCloseModal}
              style={{ marginTop: theme.spacing(2) }}
            >
              Agendar
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
