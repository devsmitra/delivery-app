import { NextPage } from "next";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Router from "next/router";
import { useMutation } from "../src/client/hooks/useMutation";
import Loader from "../src/client/components/Loader";
import { useCookies } from "react-cookie";

const Home: NextPage = () => {
  const [formData, setFormData] = useState({});
  const [err, data, loading, login] = useMutation("/login");
  const [cookies, setCookie] = useCookies(["token"]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({
      body: formData,
    });
  };

  useEffect(() => {
    if (data) {
      setCookie("token", data.data.token, { path: "/" });
      Router.push("/dashboard");
    }
  }, [data]);

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
        <Paper sx={{ p: 6, mb: 2 }}>
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

export const getServerSideProps = async (ctx: any) => {
  const { cookie } = ctx.req.headers;
  if (cookie) {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard",
      },
    };
  }
  return {
    props: {},
  };
};

export default Home;
