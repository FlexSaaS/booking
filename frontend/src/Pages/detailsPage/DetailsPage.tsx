import { useNavigate } from "react-router-dom";
import type { Appointment } from "../../types/Types";
import BackButton from "../../ReusableComponents/BackButton";
import Title from "../../ReusableComponents/Title";
import Container from "../../ReusableComponents/Container";
import type { ClientFormData } from "./components/ClientForm";
import ClientForm from "./components/ClientForm";
import AppointmentSummary from "./components/AppointmentSummary";

interface Props {
  appointment: Partial<Appointment>;
  updateAppointment: (data: Partial<Appointment>) => void;
}

function DetailsPage({ appointment, updateAppointment }: Props) {
  const navigate = useNavigate();

  const handleFormSubmit = (data: ClientFormData) => {
    updateAppointment({
      client: {
        name: data.name,
        email: data.email,
        phone: data.phone,
      },
      notes: data.notes,
    });
    navigate("/confirmation");
  };

  return (
    <Container>
      <BackButton to="/calendar">Go Back</BackButton>
      <Title>Your Information</Title>

      <AppointmentSummary
        service={appointment.service}
        date={appointment.date}
        time={appointment.time}
      />

      <ClientForm appointment={appointment} onSubmit={handleFormSubmit} />
    </Container>
  );
}

export default DetailsPage;
