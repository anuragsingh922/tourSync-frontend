export interface UserQuestionQuestion {
  _id: string;
  username: string;
  question: string;
  questionId: string;
  country: string;
  city: string;
  upvotes: number;
  downvotes: number;
  share: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  answers?: number; // Added this optional property
}

export interface postQuestionInterface {
  question: string;
  tags: string[];
}
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

export interface Answer {
  _id?: string;
  questionId: string;
  answer: string;
  username: string;
  questionText?: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  shares: number;
}
