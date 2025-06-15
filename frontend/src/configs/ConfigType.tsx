import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface ClientConfig {
  profileImage: string | undefined;
  name: string;
  tagline: string;
  logo: string;
  phone: string;
  email: string;
  address: string;
  animateProfile: boolean;
  theme: Theme;

  services: Service[];
}

export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  fontFamily: string;
}

export interface Service {
  type: string;
  icon: IconDefinition;
  description: string;
  duration: string;
  price: string;
}
