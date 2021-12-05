export interface ParcelDelivery {
  trackingNumber: string;
  originAddress: string;
  deliveryAddress: string;
  deliveryStatus: string;
  createdAt: Date;
  updatedAt: Date;
  senderId: string;
  description?: string;
  bikerId?: string;
}
