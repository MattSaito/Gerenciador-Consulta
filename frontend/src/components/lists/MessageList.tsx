"use client";
import { Container, Grid, Paper } from "@mui/material";
import MessagesTable from "../tables/MessagesTable";

export default function MessagesList() {
  return (
    <Container maxWidth="lg" sx={{ p: 2, mt: 10, mb: 4 }}>
      <Grid container>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              overflowX: "auto"
            }}
          >
            {" "}
            <MessagesTable />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
