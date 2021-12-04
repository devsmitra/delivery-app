import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ParcelDelivery } from "../src/server/typings/parcels";
import {
    Button,
    CircularProgress,
    Typography,
} from "@mui/material";
import ParcelDialog from "../src/client/components/ParcelDialog";
import { useQuery } from "../src/client/hooks/useQuery";
import { ParcelDetails } from "../src/client/components/Drawer";
import { Box } from "@mui/system";

const ROWS_PER_PAGE = 5;

interface Column {
    id:
    | "trackingNumber"
    | "originAddress"
    | "deliveryAddress"
    | "deliveryStatus"
    | "createdAt"
    | "updatedAt"
    | "senderId"
    | "description"
    | "bikerId";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: "trackingNumber", label: "Tracking Number", minWidth: 160 },
    { id: "createdAt", label: "Parcel Created", minWidth: 160 },
    { id: 'deliveryStatus', label: 'Status', minWidth: 160 },
];

const detailsColumns: Column[] = [
    { id: "originAddress", label: "Origin", minWidth: 160 },
    { id: "deliveryAddress", label: "Destination", minWidth: 160 },
    { id: 'updatedAt', label: 'Updated At', minWidth: 170 },
]

export default function ColumnGroupingTable() {
    const [page, setPage] = React.useState(0);
    const [parcel, setParcel] = React.useState<ParcelDelivery | null>(null);
    const [open, setOpen] = React.useState(false);
    const [err, result, loading, refetch] = useQuery('/api/parcels');

    const rows = result?.data ?? [];

    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);
    const onRowClick = (row: ParcelDelivery) => setParcel(row);
    const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);

    const onCreate = () => {
        onClose();
        refetch();
    }


    if (loading) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center", height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return err ? (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center", height: '100vh' }}>
            <Typography variant="h6" color="red">{
                err?.message ?? 'Something went wrong'
            }</Typography>
        </Box>
    ) : (
        <Paper sx={{ width: "100%" }}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={columns.length - 1}>
                                <Typography variant="h5">My Parcels</Typography>
                            </TableCell>
                            <TableCell >
                                <Button variant="contained" onClick={onOpen}>
                                    Create Parcel
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ top: 57, minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE)
                            .map((row: any) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.trackingNumber}
                                    >
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    onClick={() => onRowClick(row)}
                                                >
                                                    {typeof value === "object"
                                                        ? value.toLocaleString()
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={rows.length}
                rowsPerPage={ROWS_PER_PAGE}
                page={page}
                onPageChange={handleChangePage}
            />
            <ParcelDetails parcel={parcel} columns={[...columns, ...detailsColumns]} onCreate={onCreate} onClose={() => setParcel(null)} />
            <ParcelDialog open={open} onClose={onClose} onCreate={onCreate} />
        </Paper>
    );
}
