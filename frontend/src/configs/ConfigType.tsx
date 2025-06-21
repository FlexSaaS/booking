import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface ClientConfig {
  name: string;
  description: string;
  logo: string | undefined;
  phone: string;
  email: string;
  address: string;
  animateProfile: boolean;
  theme: Theme;
  location: string;

  services: Service[];
}

export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  thirdColor: string;
  fourthColor: string;
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
