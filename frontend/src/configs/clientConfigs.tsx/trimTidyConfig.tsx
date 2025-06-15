import type { ClientConfig } from "../ConfigType";
import {
  faScissors,
  faClock,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";

export const trimTidyConfig: ClientConfig = {
  name: "Trim & Tidy",
  tagline: "Quick. Clean. Affordable.",
  logo: "/logos/trimtidy.png",
  phone: "0161 555 9988",
  email: "bookings@trimtidy.com",
  address: "55 Oxford Road, Manchester",
  animateProfile: false,
  profileImage: "/trim-tidy-profile.png",

  theme: {
    primaryColor: "#2196F3", // blue
    secondaryColor: "rgb(33, 150, 243, 0.3)", // semi-transparent blue
    backgroundColor: "#FFFFFF",
    fontFamily: "'Roboto', sans-serif",
  },

  services: [
    {
      type: "Quick Trim",
      icon: faClock,
      description: "10-minute shape-up for busy people.",
      duration: "10 mins",
      price: "£10",
    },
    {
      type: "Basic Haircut",
      icon: faScissors,
      description: "Standard men's haircut with clippers or scissors.",
      duration: "25 mins",
      price: "£18",
    },
    {
      type: "Budget Cut + Wash",
      icon: faDollarSign,
      description: "Clean cut and rinse for great value.",
      duration: "30 mins",
      price: "£22",
    },
  ],
};
