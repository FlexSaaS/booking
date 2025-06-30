import type { ClientConfig } from "../ConfigType";
import {
  faScissors,
  faPalette,
  faSpa,
} from "@fortawesome/free-solid-svg-icons";

export const luxeSalonConfig: ClientConfig = {
  name: "Lauren's Hair",
  description:
    "Lauren’s Hair is run by Lauren, a talented hairdresser who creates personalized cuts, colors, and styles to make you look and feel your best. Enjoy a luxurious experience tailored just for you.",
  phone: "020 7946 0001",
  email: "info@luxesalon.co.uk",
  address: "10 Kensington High St, London",
  logo: "/luxe-salon-profile.png",
  location:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2478.8832781725673!2d-0.22423112337504625!3d51.58870257183188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487610cf8629b6f3%3A0x4802d5cd36a9a63!2s137%20Brent%20St%2C%20London%20NW4%204DJ!5e0!3m2!1sen!2suk!4v1747849113481!5m2!1sen!2suk",

  theme: {
    primaryColor: "#ce9663",
    secondaryColor: "#2C3E50",
    thirdColor: "#f3eae2",
    fourthColor: "#c7bdb5",
    backgroundColor: "#f6f1ed",
    fontFamily: `"Playfair Display", "Georgia", "Times New Roman", serif`,
  },
  animateProfile: false,

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
  backgroundImage: undefined,
};
