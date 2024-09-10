"use client";
import { Box, Container, Grid, Paper } from "@mui/material";
import DoctorTable from "../tables/DoctorTable";

export default function DoctorList() {
  return (
    <Container maxWidth="lg" sx={{ p: 2, mt: 10, mb: 4 }}>
      <Grid container>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              overflowX: "auto"
            }}
          >
            {" "}
            <DoctorTable />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
