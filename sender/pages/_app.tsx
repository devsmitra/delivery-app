import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Box } from "@mui/system";
import { CookiesProvider } from "react-cookie";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <Box sx={{ maxHeight: "100vh" }}>
        <Component {...pageProps} />
      </Box>
    </CookiesProvider>
  );
}

export default MyApp;
