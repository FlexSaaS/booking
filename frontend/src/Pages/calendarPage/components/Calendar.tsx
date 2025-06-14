import styled from "styled-components";
import { DayPicker } from "react-day-picker";
import { useEffect, useState } from "react";
import { useTimeSlotService } from "../../../hooks/useTimeSlotServices";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import type { Appointment } from "../../../types/Types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getClientConfig } from "../../../lib/getClientConfig";

const client = getClientConfig();

interface Props {
  appointment: Partial<Appointment>;
  updateAppointment: (data: Partial<Appointment>) => void;
}

function Calendar({ appointment, updateAppointment }: Props) {
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [loadingSlots, setLoadingTimes] = useState(false);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [loadingDates, setLoadingDates] = useState(true);

  const timeSlotService = useTimeSlotService();

  const handleDateSelect = (date: Date | undefined) => {
    if (date && isDateAvailable(date)) {
      updateAppointment({ date, time: undefined }); // Reset time when date changes
    }
  };

  const handleTimeSelect = (time: string) => {
    updateAppointment({ time });
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

  //   Function to check if a date is available
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
    <>
      {false ? (
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
    </>
  );
}

export default Calendar;

const NoSlotsMessage = styled.div`
  margin: 1rem 0;
`;

const LoadingMessage = styled.div`
  font-style: italic;
  margin: 1rem 0;
  color: ${client.theme.secondaryColor};
  font-size: 1rem;
`;

const CalendarWrapper = styled.div`
  max-width: 400px;
  border-radius: 12px;
  padding: 1rem;
  /* background:; */
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
  /* color:; */
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
  background: ${({ selected }) =>
    selected ? client.theme.primaryColor : client.theme.secondaryColor};
  color: ${({ selected }) =>
    selected ? client.theme.secondaryColor : client.theme.primaryColor};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${({ selected }) =>
    selected ? "0 2px 6px rgba(91, 33, 182, 0.2)" : "none"};

  &:hover {
    background: ${({ selected }) =>
      selected ? client.theme.secondaryColor : client.theme.primaryColor};
  }
`;
