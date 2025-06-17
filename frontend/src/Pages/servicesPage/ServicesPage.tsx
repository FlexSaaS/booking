import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackButton from "../../ReusableComponents/BackButton";
import ForwardButton from "../../ReusableComponents/ForwardButton";
import Title from "../../ReusableComponents/Title";
import type { Appointment } from "../../types/Types";
import ServiceOptions from "./components/ServicesOptions";
import Container from "../../ReusableComponents/Container";

interface ServicesPageProps {
  appointment: Partial<Appointment>;
  updateAppointment: (data: Partial<Appointment>) => void;
}

export default function ServicesPage({
  appointment,
  updateAppointment,
}: ServicesPageProps) {
  const navigate = useNavigate();

  const handleServiceSelect = (service: string) => {
    updateAppointment({ service });
  };

  const handleContinue = () => {
    navigate("/calendar");
  };

  return (
    <Container>
      <BackButton to="/">Go Back</BackButton>

      <Title>Select a Service</Title>

      <ServiceOptions
        appointment={appointment}
        onSelectService={handleServiceSelect}
      />

      <ForwardButton disabled={!appointment.service} onClick={handleContinue}>
        {appointment.service
          ? `Continue with ${appointment.service}`
          : "Select a Service"}
      </ForwardButton>
    </Container>
  );
}
