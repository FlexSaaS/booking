import styled from "styled-components";
import { getClientConfig } from "../../../configs/getClientConfig";

const client = getClientConfig();

function Contact() {
  return (
    <Wrapper>
      <ContactWrapper>
        <ContactDetails>
          <Label>Phone</Label>
          <Info>{client.phone}</Info>
          <Label>Email</Label>
          <Info>{client.email}</Info>
        </ContactDetails>
      </ContactWrapper>
    </Wrapper>
  );
}

export default Contact;

const Wrapper = styled.div`
  width: 100%;
  height: 300px;
  background-color: ${client.theme.thirdColor};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;

  @media (max-width: 768px) {
    height: auto;
    padding: 2rem 1rem;
  }
`;

const ContactWrapper = styled.div`
  width: 100%;
  max-width: 1400px;
`;

const ContactDetails = styled.div`
  text-align: left;
`;

const Label = styled.p`
  font-size: 0.9rem;
  color: ${client.theme.fourthColor};
  margin: 0.2rem 0;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Info = styled.p`
  font-size: 2.8rem;
  font-weight: bold;
  color: ${client.theme.primaryColor};
  margin: 0.4rem 0 1.2rem 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;
