import { Box } from "@mui/system";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { useCookies } from "react-cookie";
import "./index.css";

enum ROUTES {
  DASHBOARD = "/dashboard",
  LOGIN = "/",
}

const App = () => {
  const [{ token }] = useCookies(["token"]);
  const isAuthenticated = !!token;
  return (
    <BrowserRouter>
      <Box sx={{ maxHeight: "100vh" }}>
        <Routes>
          <Route
            path={ROUTES.LOGIN}
            element={
              isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} /> : <Login />
            }
          />
          <Route
            path={ROUTES.DASHBOARD}
            element={
              isAuthenticated ? <Dashboard /> : <Navigate to={ROUTES.LOGIN} />
            }
          />
        </Routes>
      </Box>
    </BrowserRouter>
  );
};

export default App;
