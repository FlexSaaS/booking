export interface Appointment {
  id?: string;
  date: Date;
  time: string;
  service: string;
  client: {
    name: string;
    email: string;
    phone: string;
  };
  notes?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface DaySlots {
  date: Date;
  slots: TimeSlot[];
}
