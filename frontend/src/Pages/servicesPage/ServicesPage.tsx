import { useNavigate } from "react-router-dom";
import ForwardButton from "../../ReusableComponents/ForwardButton";
import type { Appointment } from "../../types/Types";
import ServiceOptions from "./components/ServicesOptions";
import Container from "../../ReusableComponents/Container";
import SubHeader from "../../ReusableComponents/SubHeader";

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
      <SubHeader to="/" title="Select a Service" />

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
