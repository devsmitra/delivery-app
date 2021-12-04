import type { NextPage } from "next";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Button, Container, Paper, Stack, Typography } from "@mui/material";
const Home: NextPage = () => {
  const [formData, setFormData] = useState({});
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("onSubmit", formData);
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
      onSubmit={onSubmit}
    >
      <Container sx={{ p: 2 }} maxWidth="xs">
        <Paper sx={{ p: 6 }}>
          <Stack spacing={4}>
            <Typography variant="h6">Login Sender</Typography>
            <TextField
              label="Email"
              name="email"
              type="text"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              fullWidth
              onChange={handleChange}
            />
            <Button variant="contained" type="submit">
              Login
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;
