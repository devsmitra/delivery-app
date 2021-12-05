import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import { ParcelDelivery } from "../typings/parcels";
import { Response } from "../typings/Response";
import { User } from "../typings/user";

const parcels: ParcelDelivery[] = [];
export enum Status {
  READY_FOR_PICKUP = "Ready for pickup",
  IN_TRANSIT = "In transit",
  DELIVERED = "Delivered",
}

export const getParcels = (
  req: NextApiRequest,
  res: NextApiResponse<Response<ParcelDelivery[]>>
): void => {
  const { status = Status.READY_FOR_PICKUP } = req.query;
  const user = req.previewData as User;
  const deliveryStatus = Array.isArray(status) ? status[0] : status;
  const parcelsToReturn = (parcel: ParcelDelivery) => {
    let status =
      parcel.deliveryStatus?.toUpperCase() === deliveryStatus?.toUpperCase();
    if (
      status &&
      deliveryStatus.toUpperCase() !== Status.READY_FOR_PICKUP.toUpperCase()
    ) {
      status = parcel.bikerId === user.id || parcel.senderId === user.id;
    }
    return status;
  };

  res.status(200).json({
    message: "Success",
    data: parcels.filter(parcelsToReturn),
  });
};

export const createParcel = (
  req: NextApiRequest,
  res: NextApiResponse<Response<ParcelDelivery>>
): void => {
  const user = req.previewData as User;
  const parcel: ParcelDelivery = {
    ...req.body,
    senderId: user.id,
    trackingNumber: uuidv4(),
    deliveryStatus: Status.READY_FOR_PICKUP,
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
  const user = req.previewData as User;
  const { trackingNumber } = req.body;
  const index = parcels.findIndex((p) => p.trackingNumber === trackingNumber);
  if (index !== -1) {
    const parcel = parcels[index];
    let status = parcel.deliveryStatus;
    if (parcel.deliveryStatus === Status.READY_FOR_PICKUP) {
      status = Status.IN_TRANSIT;
    } else if (parcel.deliveryStatus === Status.IN_TRANSIT) {
      status = Status.DELIVERED;
    }

    if (status !== parcel.deliveryStatus) {
      parcels[index] = {
        ...parcel,
        deliveryStatus: status,
        updatedAt: new Date(),
        bikerId: user.id,
      };
    }
    return res.status(200).json({
      message: "Success",
      data: parcels[index],
    });
  }
  return res.status(404).json({ message: "Parcel not found" });
};
