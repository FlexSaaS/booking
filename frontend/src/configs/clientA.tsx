import {
  faCut,
  faPalette,
  faBrush,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";

import type { ClientConfig, ServiceType } from "../types/Config";

const clientAConfig: ClientConfig = {
  name: "Client A",
  tagline: "Book your sessions in seconds!",
  heading: "Luminous Locks Salon",
  logo: "/clientA-logo.png",
  logoAltText: "Professional Hair Stylist",
  primaryColor: "#4a2db5",
  fontFamily: "Gill Sans",
  phone: "07923423424",
  email: "masaf@hair.com",
  address: "75 liverpool street, SE46PN",

  secondaryColor: "lightgreen",

  services: [
    {
      type: "Haircut" as ServiceType,
      icon: faCut,
      description: "Professional haircut with styling",
      duration: "45 min",
      price: "£50",
    },
    {
      type: "Coloring" as ServiceType,
      icon: faPalette,
      description: "Full color service with conditioning",
      duration: "2 hours",
      price: "£120",
    },
    {
      type: "Styling" as ServiceType,
      icon: faBrush,
      description: "Special occasion styling",
      duration: "1 hour",
      price: "£75",
    },
    {
      type: "Extensions" as ServiceType,
      icon: faEllipsisH,
      description: "Hair extensions consultation and application",
      duration: "3 hours",
      price: "£250+",
    },
    {
      type: "Treatment" as ServiceType,
      icon: faEllipsisH,
      description: "Deep conditioning treatment",
      duration: "30 min",
      price: "£40",
    },
  ],
};

export default clientAConfig;
