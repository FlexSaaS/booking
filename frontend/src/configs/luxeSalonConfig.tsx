import type { ClientConfig } from "./ConfigType";
import {
  faScissors,
  faPalette,
  faSpa,
} from "@fortawesome/free-solid-svg-icons";

export const luxeSalonConfig: ClientConfig = {
  name: "Luxe Salon",
  tagline: "Luxury You Deserve",
  logo: "/logos/luxe.png",
  phone: "020 7946 0001",
  email: "info@luxesalon.co.uk",
  address: "10 Kensington High St, London",

  theme: {
    primaryColor: "#D4AF37", // gold
    secondaryColor: "#2C3E50", // dark navy
    backgroundColor: "#FDFCFB", // very light cream
    fontFamily: "'Playfair Display', serif",
  },

  services: [
    {
      type: "Haircut",
      icon: faScissors,
      description: "Luxury haircut tailored to your style.",
      duration: "45 mins",
      price: "£50",
    },
    {
      type: "Coloring",
      icon: faPalette,
      description: "Expert hair coloring with premium products.",
      duration: "90 mins",
      price: "£100",
    },
    {
      type: "Spa Treatment",
      icon: faSpa,
      description: "Relaxing head massage and scalp treatment.",
      duration: "30 mins",
      price: "£40",
    },
  ],
};
