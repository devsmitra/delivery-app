import React from "react";
import { Button, Stack, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import { PARCEL_API_URL } from "../constants/APP";
import { useMutation } from "../hooks/useMutation";

interface ParcelDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (address: any) => void;
}

interface AddressForm {
  originAddress: string;
  deliveryAddress: string;
}

const ParcelDialog: React.FC<ParcelDialogProps> = (props) => {
  const [address, setAddress] = React.useState<AddressForm>({
    originAddress: "",
    deliveryAddress: "",
  });
  const [err, data, loading, createParcel] = useMutation(PARCEL_API_URL);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setAddress((ad: AddressForm) => ({
      ...ad,
      [event.target.name]: event.target.value,
    }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createParcel({
        body: {
          ...address,
          senderId: "1",
        },
      });
      props.onCreate && props.onCreate(data);
    } catch (error) {}
  };

  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth>
      <Box component="form" onSubmit={onSubmit}>
        <DialogTitle>Create Parcel</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              autoFocus
              margin="dense"
              name="originAddress"
              label="Origin Address"
              type="text"
              fullWidth
              variant="outlined"
              multiline
              rows={3}
              onChange={handleChange}
              required
            />
            <TextField
              name="deliveryAddress"
              label="Delivery Address"
              type="text"
              fullWidth
              variant="outlined"
              multiline
              rows={3}
              onChange={handleChange}
              required
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ pr: 3, pb: 4 }}>
          <Button variant="outlined" onClick={props.onClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Create
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ParcelDialog;
