import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Box } from "@mui/system";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Box sx={{ maxHeight: "100vh" }}>
      <Component {...pageProps} />
    </Box>
  );
}

export default MyApp;
