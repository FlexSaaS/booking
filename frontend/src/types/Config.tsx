import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export type ServiceType =
  | "Haircut"
  | "Coloring"
  | "Styling"
  | "Extensions"
  | "Treatment";

export interface Service {
  type: ServiceType;
  icon: IconDefinition;
  description: string;
  duration: string;
  price: string;
}

export interface ClientConfig {
  name: string;
  tagline: string;
  logo: string;
  heading?: string;
  logoAltText: string;
  phone: string;
  email: string;
  address: string;

  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  lightGray?: string;
  darkGray?: string;
  primaryDark?: string;
  primaryWhite?: string;

  services: Service[];
}

export interface Appointment {
  id?: string;
  date: Date;
  time: string;
  service: ServiceType;
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
