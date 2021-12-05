import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Drawer,
} from "@mui/material";
import { ParcelDelivery } from "../../shared/typings/parcels";
import type { TableColumn } from "./ParcelList";

interface ParcelDetailsProps {
  parcel: ParcelDelivery | null;
  onClose: () => void;
  columns: TableColumn[];
}

export const ParcelDetails = ({
  parcel,
  onClose,
  columns,
}: ParcelDetailsProps) => (
  <Drawer
    anchor="bottom"
    open={!!parcel}
    onClose={onClose}
    variant="temporary"
    PaperProps={{
      sx: {
        maxHeight: "80%",
      },
    }}
  >
    <Card
      sx={{
        overflow: "auto",
      }}
    >
      <CardHeader
        title={parcel?.trackingNumber}
        subheader={parcel?.deliveryStatus}
        titleTypographyProps={{ variant: "h6" }}
      />
      <CardContent>
        <Table>
          <TableBody>
            {columns?.map((column: TableColumn) => {
              const value = parcel && parcel[column.id];
              return (
                <TableRow tabIndex={-1} key={column.id}>
                  <TableCell>{column.label}</TableCell>
                  <TableCell>
                    {value && typeof value === "object"
                      ? value.toString()
                      : value}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </Drawer>
);
