import DoctorForm from "@/components/main/forms/DoctorForm";
import { Box, Container, Grid, Paper } from "@mui/material";

const Page = () => {
  return (
    <main>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 5,
        }}
      >
        <Container sx={{ mt: 4, mb: 4 }}>
          <Grid
            container
            spacing={3}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              mt: 6,
            }}
          >
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                  overflowX: "auto",
                }}
              >
                {" "}
                <DoctorForm />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </main>
  );
};

export default Page;
