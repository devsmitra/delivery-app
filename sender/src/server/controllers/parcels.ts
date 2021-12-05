import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import { ParcelDelivery } from "../../shared/typings/parcels";
import { User } from "../../shared/typings/User";
import { Response } from "../typings/Response";

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

  // Filter parcel by status and user
  const parcelsToReturn = (parcel: ParcelDelivery) => {
    let status =
      parcel.deliveryStatus?.toUpperCase() === deliveryStatus?.toUpperCase();
    // sender can only see their own parcels
    if (user.role.toLowerCase() === "sender") {
      status = status && parcel.senderId === user.id;
    } else if (
      deliveryStatus.toUpperCase() !== Status.READY_FOR_PICKUP.toUpperCase()
    ) {
      // biker can only see parcels that are picked up by them
      status = status && parcel.bikerId === user.id;
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
  const { trackingNumber, date } = req.body;

  // Find parcel by tracking number
  const index = parcels.findIndex((p) => p.trackingNumber === trackingNumber);

  if (index !== -1) {
    const parcel = parcels[index];
    let status = parcel.deliveryStatus;
    // Check if parcel is in "Ready for pickup" status move to "In transit"
    if (parcel.deliveryStatus === Status.READY_FOR_PICKUP) {
      status = Status.IN_TRANSIT;
    }
    // Check if parcel is in "In transit" status move to "Delivered"
    else if (parcel.deliveryStatus === Status.IN_TRANSIT) {
      status = Status.DELIVERED;
    }

    if (status !== parcel.deliveryStatus) {
      parcels[index] = {
        ...parcel,
        deliveryStatus: status,
        updatedAt: new Date(date),
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
