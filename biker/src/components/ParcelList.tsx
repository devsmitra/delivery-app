import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import { Button, ListItemButton, Typography } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import { Fragment, useEffect, useState } from "react";
import { useQuery } from "../hooks/useQuery";
import Loader from "./Loader";
import NotRecord from "./NotFound";
import StatusConfirmation from "./StatusConfirmation";
import {
  CONFIRMATION_BUTTON_TEXT,
  DASHBOARD_TABS,
  PARCEL_API_URL,
} from "../constants/APP";
import { ParcelDelivery } from "../typings/parcels";

interface ParcelListProps {
  tabIndex: number;
}

export default function ParcelList({ tabIndex }: ParcelListProps) {
  const status = DASHBOARD_TABS[tabIndex];
  const options = {
    qs: {
      status: status,
    },
  };
  const [err, data, loading, refetch] = useQuery(PARCEL_API_URL, options);
  const [parcel, setParcel] = useState<ParcelDelivery | null>(null);
  useEffect(() => refetch(options), [tabIndex]);

  const items: ParcelDelivery[] = data?.data ?? [];
  const onPickClick = (item: ParcelDelivery) => setParcel(item);
  const onDialogClose = () => {
    setParcel(null);
    refetch(options);
  };

  const getListItem = (item: ParcelDelivery) => (
    <Fragment key={item.trackingNumber}>
      <ListItem
        secondaryAction={
          tabIndex !== 2 ? (
            <Button variant="contained" onClick={() => onPickClick(item)}>
              {CONFIRMATION_BUTTON_TEXT[tabIndex]}
            </Button>
          ) : null
        }
        disablePadding
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
      {items.length ? <List>{items.map(getListItem)}</List> : <NotRecord />}
      <StatusConfirmation
        parcel={parcel}
        onClose={onDialogClose}
        tabIndex={tabIndex}
      />
    </>
  );
}
