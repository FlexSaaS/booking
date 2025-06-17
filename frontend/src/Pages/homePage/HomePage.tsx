import { useNavigate } from "react-router-dom";
import ForwardButton from "../../ReusableComponents/ForwardButton";
import Container from "../../ReusableComponents/Container";
import ProfilePicture from "./components/ProfilePicture";
import ContactInfo from "./components/ContactInfo";
import SocialLinks from "./components/SocialLinks";
import Description from "./components/Description";

function HomePage() {
  const navigate = useNavigate();

  function handleBook(): void {
    navigate("/services");
  }

  return (
    <Container>
      <ProfilePicture />
      <Description />
      <ForwardButton onClick={handleBook}>Book an Appointment</ForwardButton>
      <ContactInfo />
      <SocialLinks />
    </Container>
  );
}

export default HomePage;
