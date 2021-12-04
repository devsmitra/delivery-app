import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";

export const Loader: FC = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center", height: '100%' }}>
        <CircularProgress />
    </Box>
);

export default Loader;