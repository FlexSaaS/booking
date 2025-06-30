import type { ClientConfig } from "../ConfigType";
import {
  faScissors,
  faClock,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";

export const trimTidyConfig: ClientConfig = {
  name: "Trim Tidy",
  description: "Quick. Clean. Affordable.",
  logo: "/trim-tidy-profile.png",
  phone: "0161 555 9988",
  email: "bookings@trimtidy.com",
  address: "55 Oxford Road, Manchester",
  animateProfile: false,

  theme: {
    primaryColor: "#ffffff", // now white — used for headings or accents
    secondaryColor: "#1f1f1f", // lighter grey for secondary elements
    backgroundColor: "#1f1f1f", // dark charcoal as main background
    fontFamily: `"Times New Roman", serif`,
    thirdColor: "#cccccc", // slightly lighter dark for cards/sections
    fourthColor: "#6e6e6e", // light grey/pure white text for dark backgrounds
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
  location:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2478.8832781725673!2d-0.22423112337504625!3d51.58870257183188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487610cf8629b6f3%3A0x4802d5cd36a9a63!2s137%20Brent%20St%2C%20London%20NW4%204DJ!5e0!3m2!1sen!2suk!4v1747849113481!5m2!1sen!2suk",
  backgroundImage: "/barber.jpg",
};
