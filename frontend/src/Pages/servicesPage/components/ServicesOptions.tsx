import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Appointment } from "../../../types/Types";
import styled from "styled-components";
import { getClientConfig } from "../../../configs/getClientConfig";

const client = getClientConfig();

interface ServiceOptionsProps {
  appointment: Partial<Appointment>;
  onSelectService: (service: string) => void;
}

export default function ServiceOptions({
  appointment,
  onSelectService,
}: ServiceOptionsProps) {
  return (
    <OptionsContainer>
      {client.services.map((service) => (
        <ServiceCard
          key={service.type}
          isSelected={appointment.service === service.type}
          onClick={() => onSelectService(service.type)}
        >
          <Details>
            <TitleRow>
              <IconWrapper>
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
    </OptionsContainer>
  );
}

const OptionsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: stretch;
  box-sizing: border-box;
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const ServiceCard = styled.div<{ isSelected: boolean }>`
  transition: all 0.3s ease;
  padding: 1rem;
  border-radius: 16px;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 0.7rem;
  }

  border: 2px solid
    ${({ isSelected }) =>
      isSelected ? client.theme.primaryColor : "transparent"};
  background-color: ${({ isSelected }) =>
    isSelected ? client.theme.primaryColor + "20" : "#fff"};

  &:hover {
    border-color: ${client.theme.secondaryColor};
    background-color: ${({ isSelected }) =>
      isSelected ? client.theme.primaryColor + "30" : "#f5f5f5"};
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

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #777;
`;
