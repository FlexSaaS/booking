// src/configs/defaultClientConfig.ts
import type { ClientConfig } from "../ConfigType";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

export const defaultClientConfig: ClientConfig = {
  name: "Default Client (Not Configured)",
  description: "Please set VITE_CLIENT in your env",
  logo: "/logos/default.png",
  phone: "000‑000‑0000",
  email: "no-reply@example.com",
  address: "N/A",
  theme: {
    primaryColor: "red",
    secondaryColor: "blue",
    backgroundColor: "#ffd6ab",
    fontFamily: "sans-serif",
    thirdColor: "",
    fourthColor: "",
  },
  services: [
    {
      type: "Unknown Service",
      icon: faQuestionCircle,
      description: "No services available for the default client.",
      duration: "0 mins",
      price: "£0",
    },
  ],
  animateProfile: false,
  location: "",
};
