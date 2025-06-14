import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "react-day-picker/dist/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import type { Appointment } from "../types/Config";
import type { getClientConfig } from "../lib/getClientConfig";
import Calendar from "./Calendar";

interface DateTimeSelectionProps {
  appointment: Partial<Appointment>;
  updateAppointment: (data: Partial<Appointment>) => void;
  client: ReturnType<typeof getClientConfig>;
}

const CalendarPage: React.FC<DateTimeSelectionProps> = ({
  client,
  appointment = { date: undefined, time: undefined },
  updateAppointment,
}) => {
  const navigate = useNavigate();

  const handleBookClick = () => {
    if (appointment?.date && appointment?.time) {
      navigate("/client");
    }
  };

  const handleBack = () => {
    navigate("/service");
  };

  // Safe date formatting
  const formatSelectedDate = (date?: Date) => {
    return date?.toLocaleDateString() || "";
  };

  return (
    <Wrapper>
      <BackButton color={client.primaryColor} onClick={handleBack}>
        <FontAwesomeIcon icon={faChevronLeft} /> Back to Home
      </BackButton>

      <Heading>Choose Date and Time</Heading>

      {/* {loadingDates ? ( */}
      {false ? ( // Simulating loading state
        <LoadingMessage>Loading available dates...</LoadingMessage>
      ) : (
        <Calendar
          appointment={appointment}
          updateAppointment={updateAppointment}
        />
      )}

      <Button
        onClick={handleBookClick}
        disabled={!appointment?.date || !appointment?.time}
      >
        {appointment?.date && appointment?.time
          ? `Book for ${formatSelectedDate(appointment.date)} at ${
              appointment.time
            }`
          : "Select Date & Time"}
      </Button>
    </Wrapper>
  );
};

export default CalendarPage;

const Wrapper = styled.div`
  max-width: 600px;
  text-align: center;
  margin: 0 auto;
  padding: 2.5rem 1rem;
`;

const LoadingMessage = styled.div`
  font-style: italic;
  margin: 1rem 0;
`;

const Heading = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const Button = styled.button<{ disabled?: boolean }>`
  margin-top: 2.5rem;
  background: ${({ disabled }) =>
    disabled ? "#ccc" : "linear-gradient(135deg, #7a59dd, #4a2db5)"};
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 14px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background: ${({ disabled }) =>
      disabled ? "#ccc" : "linear-gradient(135deg, #6b47d6, #3a1da5)"};
    transform: ${({ disabled }) => (disabled ? "none" : "scale(1.03)")};
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::after {
    left: ${({ disabled }) => (disabled ? "-100%" : "100%")};
  }
`;

const BackButton = styled.button<{ color: string }>`
  background: none;
  border: none;
  color: ${({ color }) => color};
  font-size: 1rem;
  cursor: pointer;
`;
