import { LocalizedField } from ".";

interface Location {
  latitude: number;
  longitude: number;
}

interface WorkingHours {
  from: string;
  to: string;
  active: boolean;
  dayName: string;
}

interface DeliverySubscription {
  radius: number;
  active: boolean;
}

enum CheckDeliveryLocation {
  "points" = "points",
  "radius" = "radius",
}
export interface Branch {
  _id: string;
  name: LocalizedField;
  address: LocalizedField;
  description: LocalizedField;
  referenceCode: string;
  phone: string;
  mapLocation: string;
  noLocationOrder: number;
  mapOrder: number;
  deliveryFees: number;
  pickup: boolean;
  carPickup: boolean;
  deliveryActive: boolean;
  subscriptionActive: boolean;
  autoConfirmation: boolean;
  autoCancellation: boolean;
  autoCancellationMinutes: number;
  active: boolean;
  archive: boolean;
  workingHours: Record<number, WorkingHours>;
  checkSubscriptionLocation: CheckDeliveryLocation;
  checkDeliveryLocation: CheckDeliveryLocation;
  //* points map keys
  deliveryLocation: Location[];
  subscriptionLocation: Location[];
  //* radius map keys
  deliveryRadius: number;
  subscriptionRadius: number;
  location: Location;
  createdAt: string;
  updatedAt: string;
}
