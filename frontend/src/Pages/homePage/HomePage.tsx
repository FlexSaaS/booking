import { useNavigate } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { getClientConfig } from "../../configs/getClientConfig";
import ForwardButton from "../../ReusableComponents/ForwardButton";

const client = getClientConfig();

function HomePage() {
  const navigate = useNavigate();

  function handleBook(): void {
    navigate("/services");
  }

  return (
    <Container>
      <ProfileCard>
        <ProfileImageContainer>
          <Decoration />
          <ProfileImage src={client.profileImage} alt={`${client.name}'s profile`} $animate={client.animateProfile} />
        </ProfileImageContainer>

        <ForwardButton onClick={handleBook}>Book an Appointment</ForwardButton>

        <Description>{client.tagline}</Description>
        <ContactInfo>
          <p>
            <strong>Phone:</strong>
            {client.phone}
          </p>
          <p>
            <strong>Email:</strong> {client.email}
          </p>
          <p>
            <strong>Address:</strong> {client.address}
          </p>
        </ContactInfo>

        <SocialLinks>
          <SocialLink href="#" aria-label="Instagram">
            <FontAwesomeIcon icon={faInstagram} />
          </SocialLink>
          <SocialLink href="#" aria-label="Facebook">
            <FontAwesomeIcon icon={faFacebook} />
          </SocialLink>
        </SocialLinks>
      </ProfileCard>
    </Container>
  );
}

export default HomePage;

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// will chnage the linar gradient to match client style later
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
  background: linear-gradient(135deg, #fff8f0, #fae0ff, #e0f4ff, #f0fff8);
  background-size: 400% 400%;
  animation: ${gradientShift} 15s ease infinite;
`;

const ProfileCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 3rem;
  border-radius: 24px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
  text-align: center;
  max-width: 600px;
  width: 100%;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: ${fadeIn} 0.8s ease-out forwards;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    width: 90%;
    padding: 2rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 1rem;
  }
`;

const ProfileImageContainer = styled.div`
  position: relative;
  margin: 0 auto;
  width: 180px;
  height: 180px;

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;

interface ProfileImageProps {
  $animate: boolean;
}

const ProfileImage = styled.img<ProfileImageProps>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid ${client.theme.primaryColor};
  box-shadow: 0 10px 30px ${client.theme.primaryColor}33;
  animation: ${fadeIn} 0.8s ease-out forwards;
  transition: all 0.3s ease;

  ${(props) =>
    props.$animate &&
    css`
      animation: ${float} 4s ease-in-out infinite;
    `}

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 15px 40px ${client.theme.primaryColor}55;
  }
`;

const Decoration = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 2px dashed ${client.theme.primaryColor}33;
  border: ${client.animateProfile ? ` 2px dashed ${client.theme.primaryColor}33` : "none"};
  top: -10px;
  left: -10px;
  animation: spin 20s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  margin-top: 0.6rem;
  color: #555;
  max-width: 420px;
  margin-left: auto;
  margin-right: auto;
`;

const ContactInfo = styled.div`
  margin-top: 2rem;
  font-size: 1rem;
  line-height: 1.6;
  color: #444;
  p {
    margin: 0.4rem 0;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const SocialLink = styled.a`
  color: ${client.theme.primaryColor};
  font-size: 1.5rem;
  transition: all 0.3s ease;
  &:hover {
    color: ${client.theme.secondaryColor};
    transform: scale(1.2);
    transform: translateY(-3px);
  }
`;
