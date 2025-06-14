import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Appointment } from "../../../types/Types";
import styled from "styled-components";
import { getClientConfig } from "../../../lib/getClientConfig";

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
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: stretch;
`;

const ServiceCard = styled.div<{ isSelected: boolean }>`
  padding: 1.5rem;
  border-radius: 16px;
  cursor: pointer;
  background-color: ${({ isSelected }) =>
    isSelected ? client.theme.primaryColor : "#fff"};
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${client.theme.secondaryColor};
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
