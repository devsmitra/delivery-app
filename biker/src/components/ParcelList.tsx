import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItemButton,
  Typography,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import { FC, useEffect, useState } from "react";
import { useQuery } from "../hooks/useQuery";
import Loader from "./Loader";
import { ApiService } from "../services/ApiService";

interface ConfirmationParcelDialogProps {
  open: null | any;
  tabIndex: number;
  onClose: () => void;
}

interface ParcelListProps {
  tabIndex: number;
}

const TABS = ["Ready for pickup", "In Transit", "Delivered"];
const ButtonText = ["Pick", "Deliver"];

const Confirmation: FC<ConfirmationParcelDialogProps> = ({
  open,
  onClose,
  tabIndex,
}) => {
  const onSubmit = async () => {
    await ApiService.put(`/parcels?trackingNumber=${open.trackingNumber}`, {
      body: {
        senderId: "1",
        deliveryStatus: "Picked",
      } as any,
    });
    onClose && onClose();
  };
  return (
    <Dialog open={!!open} onClose={onClose}>
      <DialogTitle>{ButtonText[tabIndex]}</DialogTitle>
      <DialogContent>
        <DialogContentText>Sure you want to continue?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          No
        </Button>
        <Button variant="contained" onClick={onSubmit}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default function ParcelList({ tabIndex }: ParcelListProps) {
  const status = TABS[tabIndex];
  const options = {
    qs: {
      status: status,
    },
  };
  const [err, data, loading, refetch] = useQuery(`/parcels`, options);
  const [open, setOpen] = useState(null);
  useEffect(() => refetch(options), [tabIndex]);

  const items = data?.data ?? [];
  const onPickClick = (item: any) => setOpen(item);
  const onDialogClose = () => {
    setOpen(null);
    refetch(options);
  };

  const getListItem = (item: any) => (
    <>
      <ListItem
        key={item.trackingNumber}
        secondaryAction={
          tabIndex !== 2 ? (
            <Button variant="contained" onClick={() => onPickClick(item)}>
              {ButtonText[tabIndex]}
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
    </>
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
      <Confirmation open={open} onClose={onDialogClose} tabIndex={tabIndex} />
    </>
  );
}
