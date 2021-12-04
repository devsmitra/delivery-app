export interface ParcelDelivery {
  trackingNumber: string;
  originAddress: string;
  deliveryAddress: string;
  deliveryStatus: "Ready for pickup" | "In Transit" | "Delivered";
  createdAt: Date;
  updatedAt: Date;
  senderId: string;
  description?: string;
  bikerId?: string;
}
