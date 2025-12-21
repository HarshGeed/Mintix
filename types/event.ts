export type Event = {
    id: string;
    title: string;
    description: string;
    location?: string;
    isOnline: boolean;
    startDate: Date;
    endDate: Date;
    capacity?: number;
    price: string;
    createdAt: Date;
    updatedAt: Date;
  };
  
  export type CreateEventInput = Omit<
    Event,
    "id" | "createdAt" | "updatedAt" | "price"
  > & {
    price?: string;
  };
  
  export type UpdateEventInput = Partial<CreateEventInput>;

  export type EventStatus = "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";
  