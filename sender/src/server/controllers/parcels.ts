import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import { ParcelDelivery } from "../typings/parcels";
import { Response } from "../typings/Response";

const parcels: ParcelDelivery[] = [];

export const getParcels = (
  req: NextApiRequest,
  res: NextApiResponse<Response<ParcelDelivery[]>>
): void => {
  const { status = "Ready for pickup" } = req.query;
  const deliveryStatus = Array.isArray(status) ? status[0] : status;

  res.status(200).json({
    message: "Success",
    data: parcels.filter(
      (parcel) =>
        parcel.deliveryStatus.toUpperCase() === deliveryStatus.toUpperCase()
    ),
  });
};

export const createParcel = (
  req: NextApiRequest,
  res: NextApiResponse<Response<ParcelDelivery>>
): void => {
  const parcel: ParcelDelivery = {
    ...req.body,
    trackingNumber: uuidv4(),
    deliveryStatus: "Ready for pickup",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  parcels.push(parcel);
  res.status(200).json({
    message: "Success",
    data: parcel,
  });
};

export const updateParcel = (
  req: NextApiRequest,
  res: NextApiResponse<Response<ParcelDelivery>>
): void => {
  const { trackingNumber } = req.query;
  const index = parcels.findIndex((p) => p.trackingNumber === trackingNumber);
  if (index !== -1) {
    const parcel = parcels[index];
    let status = parcel.deliveryStatus;
    if (parcel.deliveryStatus === "Ready for pickup") {
      status = "In Transit";
    } else if (parcel.deliveryStatus === "In Transit") {
      status = "Delivered";
    }

    if (status !== parcel.deliveryStatus) {
      parcels[index] = {
        ...parcel,
        deliveryStatus: status,
        updatedAt: new Date(),
      };
    }
    return res.status(200).json({
      message: "Success",
      data: parcels[index],
    });
  }
  return res.status(404).json({ message: "Parcel not found" });
};
