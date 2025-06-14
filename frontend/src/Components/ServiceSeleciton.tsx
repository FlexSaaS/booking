import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Appointment, ServiceType } from "../types/Config";
import { useNavigate } from "react-router-dom";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { getClientConfig } from "../lib/getClientConfig";

interface ServiceSelectionProps {
  client: ReturnType<typeof getClientConfig>;
  appointment: Partial<Appointment>;
  updateAppointment: (data: Partial<Appointment>) => void;
}

function ServiceSelection({
  client,
  appointment,
  updateAppointment,
}: ServiceSelectionProps) {
  const navigate = useNavigate();

  const handleServiceSelect = (service: ServiceType) => {
    updateAppointment({ service });
  };

  const handleContinue = () => {
    navigate("/time");
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <Container font={client.fontFamily}>
      <BackButton color={client.primaryColor} onClick={handleBack}>
        <FontAwesomeIcon icon={faChevronLeft} /> Back to Home
      </BackButton>

      <Title color={client.primaryColor}>Select a Service</Title>

      <ServiceOptions>
        {client.services.map((service) => (
          <ServiceCard
            key={service.type}
            isSelected={appointment.service === service.type}
            primaryColor={client.primaryColor}
            secondaryColor={client.secondaryColor}
            onClick={() => handleServiceSelect(service.type)}
          >
            <Details>
              <TitleRow>
                <IconWrapper color={client.primaryColor}>
                  <FontAwesomeIcon icon={service.icon} size="lg" />
                </IconWrapper>
                <h3>{service.type}</h3>
              </TitleRow>

              <p>{service.description}</p>
              <Meta>
                <span>{service.duration}</span>
                <span>{service.price}</span>
              </Meta>
            </Details>
          </ServiceCard>
        ))}
      </ServiceOptions>

      <ButtonWrapper>
        <BookButton
          font={client.fontFamily}
          primaryColor={client.primaryColor}
          secondaryColor={client.secondaryColor}
          disabled={!appointment.service}
          onClick={handleContinue}
        >
          {appointment.service
            ? `Continue with ${appointment.service}`
            : "Select a Service"}
        </BookButton>
      </ButtonWrapper>
    </Container>
  );
}

export default ServiceSelection;

const Container = styled.div<{ font: string }>`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: ${({ font }) => font};
`;

const Title = styled.h2<{ color: string }>`
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: ${({ color }) => color};
  margin-bottom: 2rem;
`;

const BackButton = styled.button<{ color: string }>`
  background: none;
  border: none;
  color: ${({ color }) => color};
  font-size: 1rem;
  cursor: pointer;
`;

const ServiceOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: stretch;
`;

const ServiceCard = styled.div<{
  isSelected: boolean;
  primaryColor: string;
  secondaryColor: string;
}>`
  padding: 1.5rem;
  border-radius: 16px;
  cursor: pointer;
  background-color: ${({ isSelected, primaryColor }) =>
    isSelected ? primaryColor : "#fff"};
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: ${({ secondaryColor }) => secondaryColor};
  }
`;

const Details = styled.div`
  p {
    font-size: 0.95rem;
    color: #555;
    margin-bottom: 0.75rem;
  }

  h3 {
    font-size: 1.2rem;
    color: #222;
    margin: 0;
  }
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const IconWrapper = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  display: flex;
  align-items: center;
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #777;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

const BookButton = styled.button<{
  font: string;
  primaryColor: string;
  secondaryColor: string;
}>`
  font-family: ${({ font }) => font};
  color: white;
  padding: 0.9rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  background-color: ${({ primaryColor }) => primaryColor};
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ secondaryColor }) => secondaryColor};
  }
`;
