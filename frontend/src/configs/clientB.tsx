import { faCut, faPalette, faBrush } from "@fortawesome/free-solid-svg-icons";

import type { ClientConfig, ServiceType } from "../types/Config";

const clientAConfig: ClientConfig = {
  name: "Client B",
  tagline: "Client B - Tagline goes here",
  logo: "/clientB-logo.png",

  primaryColor: "purple",
  secondaryColor: "brown",
  fontFamily: "Montserrat",

  services: [
    {
      type: "Service 1" as ServiceType,
      icon: faCut,
      description: "Description for Service 1",
      duration: "30 min",
      price: "£50",
    },
    {
      type: "Service 2" as ServiceType,
      icon: faPalette,
      description: "Description for Service 2",
      duration: "2 hours",
      price: "£100",
    },
    {
      type: "Service 3" as ServiceType,
      icon: faBrush,
      description: "Description for Service 3",
      duration: "1 hour",
      price: "£100,000",
    },
  ],
};

export default clientAConfig;
