import styled from "styled-components";
import { getClientConfig } from "../../../configs/getClientConfig";
import ForwardButton from "../../../ReusableComponents/ForwardButton";
import { useNavigate } from "react-router-dom";
import SocialLinks from "./SocialLinks";

const client = getClientConfig();

function Hero() {
  const navigate = useNavigate();

  function handleBook(): void {
    navigate("/services");
  }

  return (
    <Wrapper>
      <Name>{client.name}</Name>
      <Description>{client.description}</Description>
      <ButtonWrapper>
        <ForwardButton onClick={handleBook}>Book an Appointment</ForwardButton>
      </ButtonWrapper>
      <SocialLinks />
    </Wrapper>
  );
}

export default Hero;

const Wrapper = styled.div`
  max-width: 1400px;
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 2rem;

  @media (max-width: 768px) {
    height: 450px;
  }
`;

const Name = styled.h1`
  width: 200px;
  font-size: 6rem;
  font-weight: 900;
  color: ${client.theme.primaryColor};
  margin-bottom: 1rem;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Description = styled.p`
  width: 600px;
  font-size: 1.2rem;
  color: ${client.theme.primaryColor};
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    width: 300px;
  }
`;

const ButtonWrapper = styled.div`
  align-self: flex-end;
`;
