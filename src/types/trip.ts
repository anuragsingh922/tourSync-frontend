export interface Trip {
  _id: string;
  tripName: string;
  tripID: string;
  description: string;
  startingTime: string;
  endingTime: string;
  price: string;
  slots: string[];
  cancellationPolicy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  _id: string;
  paymentId: string;
  amount: string;
  currency: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  processedAt: string;
}
export interface paymentPayload {
  amount: string;
  currency: string;
  description : string;
  trips : any
}