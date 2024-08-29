import AppointmentForm from "@/components/main/forms/AppointmentForm";
import { Box, Container, Grid, Paper } from "@mui/material";

export default function Page() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        padding: 5,
      }}
    >
      <Container sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}     sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                mt: 6,  
              }}>

              <AppointmentForm />
        </Grid>
      </Container>
    </Box>
  );
}