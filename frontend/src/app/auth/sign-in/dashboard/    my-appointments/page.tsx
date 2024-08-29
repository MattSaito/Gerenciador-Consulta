"use client";
import Historic from "@/components/sub/dashboard/Historic";
import { Box, Container, Grid, Paper } from "@mui/material";

export default function Page() {
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 5,
          width: "100vh"
        }}
      >
        <Container sx={{ mt: 4, mb: 4 }}>
          <Grid
            
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              mt: 6,
            }}
          >
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Historic />
            </Paper>
          </Grid>
        </Container>
      </Box>
    </>
  );
}