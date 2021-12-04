import { Box } from "@mui/system";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from './pages/Login';

const App = () => (
  <BrowserRouter>
    <Box sx={{ maxHeight: '100vh' }}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Box>
  </BrowserRouter>
);

export default App;
