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

interface ParcelListProps {
  tabIndex: number;
}

const TABS = ["Ready for pickup", "In Transit", "Delivered"];
const columns = [
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
  const status = TABS[tabIndex];
  const options = {
    qs: {
      status: status,
    },
  };
  const [err, data, loading, refetch] = useQuery("/parcels", options);
  const [parcel, setParcel] = useState(null);
  const [open, setOpen] = useState(false);
  useEffect(() => refetch(options), [tabIndex]);

  const items = data?.data ?? [];
  const onClose = () => setOpen(false);
  const onCreate = () => {
    onClose();
    refetch(options);
  };
  const getListItem = (item: any) => (
    <Fragment key={item.trackingNumber}>
      <ListItem
        key={item.trackingNumber}
        disablePadding
        onClick={() => setParcel(item)}
      >
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
      <List>{items.map(getListItem)}</List>
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
