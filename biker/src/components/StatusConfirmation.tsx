import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { FC, useState } from "react";
import Loader from "./Loader";
import { useMutation } from "../hooks/useMutation";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Box } from "@mui/system";
import { CONFIRMATION_BUTTON_TEXT, PARCEL_API_URL } from "../constants/APP";
import { ParcelDelivery } from "../typings/parcels";

interface ConfirmationParcelDialogProps {
  parcel: null | ParcelDelivery;
  tabIndex: number;
  onClose: () => void;
}
export const StatusConfirmation: FC<ConfirmationParcelDialogProps> = ({
  parcel,
  onClose,
  tabIndex,
}) => {
  const [err, _data, loading, updateParcel] = useMutation(PARCEL_API_URL);
  const [date, setDate] = useState<Date | null>(new Date());

  const onSubmit = async () => {
    await updateParcel({
      body: {
        deliveryStatus: "Picked",
        trackingNumber: parcel?.trackingNumber,
        date,
      } as any,
      method: "PUT",
    });
    onClose && onClose();
  };
  return (
    <Dialog open={!!parcel} onClose={onClose}>
      <DialogTitle>{CONFIRMATION_BUTTON_TEXT[tabIndex]}</DialogTitle>
      {loading ? (
        <Loader />
      ) : (
        <>
          <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box py={2}>
                <MobileDatePicker
                  label="Date"
                  inputFormat="MM/dd/yyyy"
                  value={date}
                  onChange={setDate}
                  renderInput={(params) => <TextField {...params} />}
                  // minDate={new Date(open?.updatedAt)}
                  maxDate={new Date()}
                />
              </Box>
              {err && (
                <Alert variant="outlined" severity="error">
                  {err.message}
                </Alert>
              )}
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={onClose}>
              No
            </Button>
            <Button variant="contained" onClick={onSubmit}>
              {CONFIRMATION_BUTTON_TEXT[tabIndex]}
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default StatusConfirmation;
