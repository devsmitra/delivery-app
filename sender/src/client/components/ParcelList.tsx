import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import {
  ListItemButton,
  SpeedDial,
  SpeedDialIcon,
  Typography,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import { Fragment, useEffect, useState } from "react";
import { useQuery } from "../hooks/useQuery";
import Loader from "./Loader";
import { ParcelDetails } from "./Drawer";
import ParcelDialog from "./ParcelDialog";
import NotFound from "./NotFound";
import { DASHBOARD_TABS, PARCEL_API_URL } from "../constants/APP";
import { ParcelDelivery } from "../../shared/typings/parcels";

interface ParcelListProps {
  tabIndex: number;
}

export interface TableColumn {
  id: keyof ParcelDelivery;
  label: string;
}

const columns: TableColumn[] = [
  {
    id: "originAddress",
    label: "Origin Address",
  },
  {
    id: "deliveryAddress",
    label: "Delivery Address",
  },
  {
    id: "createdAt",
    label: "Created At",
  },
  {
    id: "updatedAt",
    label: "Updated At",
  },
];

export default function ParcelList({ tabIndex }: ParcelListProps) {
  const status = DASHBOARD_TABS[tabIndex];
  const options = {
    qs: {
      status: status,
    },
  };
  const [err, data, loading, refetch] = useQuery(PARCEL_API_URL, options);
  const [parcel, setParcel] = useState<ParcelDelivery | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => refetch(options), [tabIndex]);

  const items = data?.data ?? [];
  const onClose = () => setOpen(false);
  const onCreate = () => {
    onClose();
    refetch(options);
  };
  const getListItem = (item: ParcelDelivery) => (
    <Fragment key={item.trackingNumber}>
      <ListItem disablePadding onClick={() => setParcel(item)}>
        <ListItemButton alignItems="flex-start">
          <ListItemText
            primary={item.originAddress}
            secondary={item.deliveryStatus}
          />
        </ListItemButton>
      </ListItem>
      <Divider component="li" />
    </Fragment>
  );

  if (loading) return <Loader />;
  if (err)
    return (
      <Typography variant="h6" color="red" align="center">
        {err?.message ?? "Something went wrong"}
      </Typography>
    );
  return (
    <>
      {items.length ? <List>{items.map(getListItem)}</List> : <NotFound />}
      <ParcelDetails
        parcel={parcel}
        columns={columns}
        onClose={() => setParcel(null)}
      />
      <SpeedDial
        icon={<SpeedDialIcon />}
        ariaLabel="create parcel"
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
        }}
      />
      <ParcelDialog open={open} onClose={onClose} onCreate={onCreate} />
    </>
  );
}
