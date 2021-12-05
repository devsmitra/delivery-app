import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { FC, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useMutation } from "../hooks/useMutation";
import Loader from "../components/Loader";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { LOGIN_API_URL } from "../constants/APP";

const Login: FC = () => {
  const [formData, setFormData] = useState({});
  const [err, data, loading, login] = useMutation(LOGIN_API_URL);
  const [_, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setCookie("token", data?.data?.token, { path: "/" });
      navigate("/dashboard");
    }
  }, [data]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({
      body: formData,
    });
  };

  if (loading) {
    return <Loader />;
  }

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
        {err && (
          <Alert variant="outlined" severity="error">
            {err.message}
          </Alert>
        )}
      </Container>
    </Box>
  );
};

export default Login;
