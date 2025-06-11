import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DayPicker } from "react-day-picker";
import { useNavigate } from "react-router-dom";
import "react-day-picker/dist/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faClock } from "@fortawesome/free-solid-svg-icons";
import type { Appointment } from "../types/Config";
import { useTimeSlotService } from "../hooks/useTimeSlotServices";
import type { getClientConfig } from "../lib/getClientConfig";

interface DateTimeSelectionProps {
  appointment: Partial<Appointment>;
  updateAppointment: (data: Partial<Appointment>) => void;
  client: ReturnType<typeof getClientConfig>;
}

const Booking: React.FC<DateTimeSelectionProps> = ({
  client,
  appointment = { date: undefined, time: undefined },
  updateAppointment,
}) => {
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [loadingSlots, setLoadingTimes] = useState(false);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [loadingDates, setLoadingDates] = useState(true);

  const navigate = useNavigate();
  const timeSlotService = useTimeSlotService();

  const handleDateSelect = (date: Date | undefined) => {
    if (date && isDateAvailable(date)) {
      updateAppointment({ date, time: undefined }); // Reset time when date changes
    }
  };

  const handleTimeSelect = (time: string) => {
    updateAppointment({ time });
  };

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

  //   useEffect(() => {
  //     const fetchAvailableDates = async () => {
  //       try {
  //         const dates = await timeSlotService.getAllAvailability();
  //         setAvailableDates(dates);
  //       } catch (error) {
  //         console.error("Error fetching available dates:", error);
  //         setAvailableDates([]);
  //       } finally {
  //         setLoadingDates(false);
  //       }
  //     };

  //     fetchAvailableDates();
  //   }, [timeSlotService]);

  // Function to check if a date is available
  const isDateAvailable = (date: Date) => {
    return availableDates.some(
      (availableDate) =>
        availableDate.getFullYear() === date.getFullYear() &&
        availableDate.getMonth() === date.getMonth() &&
        availableDate.getDate() === date.getDate()
    );
  };

  // Function to disable dates in the calendar
  const getDisabledDays = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Disable past dates and dates that aren't in availableDates
    return date < today || !isDateAvailable(date);
  };

  //   useEffect(() => {
  //     const fetchAvailableTimes = async () => {
  //       if (appointment?.date) {
  //         setLoadingTimes(true);
  //         try {
  //           const slots = await timeSlotService.getAvailableTimeSlots(
  //             appointment.date
  //           );
  //           setAvailableTimes(slots);
  //         } catch (error) {
  //           console.error("Error fetching time slots:", error);
  //           setAvailableTimes([]);
  //         } finally {
  //           setLoadingTimes(false);
  //         }
  //       }
  //     };

  //     fetchAvailableTimes();
  //   }, [appointment?.date, timeSlotService]);

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
        <>
          <CalendarWrapper>
            <DayPicker
              mode="single"
              selected={appointment?.date}
              onSelect={handleDateSelect}
              disabled={getDisabledDays}
              // modifiers={{ disabled: getDisabledDays }}
              modifiersStyles={{
                disabled: {
                  color: "#ccc",
                  backgroundColor: "#f8f9fa",
                  textDecoration: "line-through",
                },
              }}
            />
          </CalendarWrapper>

          {appointment?.date && (
            <>
              <SectionTitle>
                <FontAwesomeIcon icon={faClock} />
                Available Time Slots
              </SectionTitle>
              {loadingSlots ? (
                <LoadingMessage>Loading available times...</LoadingMessage>
              ) : availableTimes.length > 0 ? (
                <TimeSlots>
                  {availableTimes.map((time) => (
                    <TimeButton
                      key={time}
                      selected={appointment?.time === time}
                      onClick={() => handleTimeSelect(time)}
                      type="button"
                    >
                      {time}
                    </TimeButton>
                  ))}
                </TimeSlots>
              ) : (
                <NoSlotsMessage>
                  No available time slots for this date
                </NoSlotsMessage>
              )}
            </>
          )}
        </>
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

export default Booking;

const Wrapper = styled.div`
  max-width: 600px;
  text-align: center;
  margin: 0 auto;
  padding: 2.5rem 1rem;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
`;

const LoadingMessage = styled.div`
  color: #666;
  font-style: italic;
  margin: 1rem 0;
`;

const NoSlotsMessage = styled.div`
  color: #ff6b6b;
  margin: 1rem 0;
`;

const Heading = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const CalendarWrapper = styled.div`
  max-width: 400px;
  border-radius: 12px;
  padding: 1rem;
  background: white;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  margin: 0 auto;
`;

const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin: 1.5rem 0 1rem;
`;

const TimeSlots = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 0.5rem;
`;

const TimeButton = styled.button<{ selected: boolean }>`
  padding: 0.5rem;
  border-radius: 8px;
  border: none;
  background: ${({ selected }) => (selected ? "#5b21b6" : "#f3f4f6")};
  color: ${({ selected }) => (selected ? "white" : "#4b5563")};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${({ selected }) =>
    selected ? "0 2px 6px rgba(91, 33, 182, 0.2)" : "none"};

  &:hover {
    background: ${({ selected }) => (selected ? "#4c1d95" : "#e5e7eb")};
  }
`;

const Button = styled.button<{ disabled?: boolean }>`
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
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
