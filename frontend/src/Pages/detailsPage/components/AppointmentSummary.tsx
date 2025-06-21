import React from "react";
import styled from "styled-components";

interface Props {
  service?: string;
  date?: string | Date;
  time?: string;
}

export default function AppointmentSummary({ service, date, time }: Props) {
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <Summary>
      {service} on {formattedDate} at {time}
    </Summary>
  );
}

const Summary = styled.p`
  text-align: center;
  margin-bottom: 1rem;
  color: #666;
  font-size: 1.1rem;
  font-weight: 500;
`;
