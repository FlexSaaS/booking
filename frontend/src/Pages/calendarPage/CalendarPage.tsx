import { useNavigate } from "react-router-dom";
import "react-day-picker/dist/style.css";
import type { Appointment } from "../../types/Types";
import Calendar from "./components/Calendar";
import ForwardButton from "../../ReusableComponents/ForwardButton";
import Container from "../../ReusableComponents/Container";
import SubHeader from "../../ReusableComponents/SubHeader";

interface Props {
  appointment: Partial<Appointment>;
  updateAppointment: (data: Partial<Appointment>) => void;
}

function CalendarPage({ appointment, updateAppointment }: Props) {
  const navigate = useNavigate();

  const handleBookClick = () => {
    if (appointment?.date && appointment?.time) {
      navigate("/details");
    }
  };

  const formatSelectedDate = (date?: Date) => {
    return date?.toLocaleDateString() || "";
  };

  const isDisabled = !(appointment.date && appointment.time);

  return (
    <Container>
      <SubHeader to={"/services"} title={"Select a date"} />

      <Calendar
        appointment={appointment}
        updateAppointment={updateAppointment}
      />

      <ForwardButton disabled={isDisabled} onClick={handleBookClick}>
        {isDisabled
          ? "Select Date & Time"
          : `Book for ${formatSelectedDate(appointment.date)} at ${
              appointment.time
            }`}
      </ForwardButton>
    </Container>
  );
}

export default CalendarPage;
