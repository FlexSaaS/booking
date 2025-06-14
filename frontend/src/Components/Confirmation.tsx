import React, { useState } from "react";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faClock,
  faScissors,
  faUser,
  faCheck,
  faEnvelope,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
// import emailjs from "@emailjs/browser";
import type { Appointment } from "../types/Config";
import type { getClientConfig } from "../lib/getClientConfig";

interface ConfirmationProps {
  appointment: Appointment;
  client: ReturnType<typeof getClientConfig>;
}

const Confirmation: React.FC<ConfirmationProps> = ({ appointment, client }) => {
  const navigate = useNavigate();

  // const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  // const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  // const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleEdit = () => {
    navigate("/client");
  };

  const handleConfirm = () => {
    // console.log("Appointment confirmed:", appointment);
    setIsConfirmed(true);

    // const templateParams = {
    //   client_name: appointment.client.name,
    //   client_email: appointment.client.email,
    //   client_phone: appointment.client.phone,
    //   service: appointment.service,
    //   date: format(appointment.date, "EEEE, MMMM do, yyyy"),
    //   time: appointment.time,
    //   notes: appointment.notes || '',

    // };

    // // Send confirmation to the client
    // emailjs.send( serviceId, templateId, templateParams, publicKey )
    // .then((res) => {console.log("Client email sent:", res.status);})
    // .catch((err) => {console.error("Client email failed:", err)});

    // TODO, build a template and Send notification to the owner
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  if (isConfirmed) {
    return (
      <ModalOverlay onClick={handleBackToHome}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <SuccessIcon color={client.primaryGreen || "#4CAF50"}>
            <FontAwesomeIcon icon={faCheck} />
          </SuccessIcon>
          <ModalTitle color={client.primaryGreen || "#10b981"}>
            Appointment Confirmed!
          </ModalTitle>
          <ModalText>
            Your appointment has been successfully booked. A confirmation has
            been sent to your email.
          </ModalText>

          <div>
            <SummaryItem color={client.primaryColor}>
              <FontAwesomeIcon icon={faCalendarAlt} />
              <span>{format(appointment.date, "EEEE, MMMM do, yyyy")}</span>
            </SummaryItem>
            <SummaryItem color={client.primaryColor}>
              <FontAwesomeIcon icon={faClock} />
              <span>{appointment.time}</span>
            </SummaryItem>
            <SummaryItem color={client.primaryColor}>
              <FontAwesomeIcon icon={faScissors} />
              <span>{appointment.service}</span>
            </SummaryItem>
          </div>

          <HomeButton color={client.primaryColor} onClick={handleBackToHome}>
            Back to Home
          </HomeButton>
        </ModalContainer>
      </ModalOverlay>
    );
  }

  // Check if critical information is missing
  const isMissingCriticalInfo =
    !appointment.date ||
    !appointment.time ||
    !appointment.service ||
    !appointment.client?.name;

  if (isMissingCriticalInfo) {
    return (
      <ErrorContainer>
        <ErrorIcon>
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </ErrorIcon>
        <ErrorTitle>Missing Information</ErrorTitle>
        <ErrorMessage>
          Your appointment details are incomplete. Please go back and complete
          your booking.
        </ErrorMessage>
        <ErrorDetails>
          {!appointment.date && <div>- Appointment date is missing</div>}
          {!appointment.time && <div>- Appointment time is missing</div>}
          {!appointment.service && <div>- Service selection is missing</div>}
          {!appointment.client?.name && <div>- Your name is missing</div>}
        </ErrorDetails>
        <BackButton onClick={() => navigate("/client")}>
          Go Back to Complete Booking
        </BackButton>
      </ErrorContainer>
    );
  }

  return (
    <ConfirmationContainer
      boxShadowColor={client.boxShadowColor || "rgba(0, 0, 0, 0.1)"}
    >
      <ConfirmationHeader>
        <ConfirmationIcon color={client.darkGray || "#1f2937"}>
          <FontAwesomeIcon icon={faCheck} size="sm" />
        </ConfirmationIcon>
        <h2 style={{ marginBottom: "10px" }}>Confirm Your Appointment</h2>
        <p>Please review your appointment details below</p>
      </ConfirmationHeader>

      <AppointmentDetails>
        <DetailItem>
          <FontAwesomeIcon icon={faCalendarAlt} />
          <span>{format(appointment.date, "EEEE, MMMM do, yyyy")}</span>
        </DetailItem>

        <DetailItem>
          <FontAwesomeIcon icon={faClock} />
          <span>{appointment.time}</span>
        </DetailItem>

        <DetailItem>
          <FontAwesomeIcon icon={faScissors} />
          <span>{appointment.service}</span>
        </DetailItem>

        <DetailItem>
          <FontAwesomeIcon icon={faUser} />
          <span>{appointment.client.name}</span>
        </DetailItem>

        <DetailItem>
          <FontAwesomeIcon icon={faEnvelope} />
          <span>{appointment.client.email}</span>
        </DetailItem>

        {appointment.notes && (
          <Notes>
            <h4>Special Requests:</h4>
            <p>{appointment.notes}</p>
          </Notes>
        )}
      </AppointmentDetails>

      <ConfirmationActions>
        <EditButton color={client.primaryColor} onClick={handleEdit}>
          Edit Appointment
        </EditButton>
        <ConfirmButton color={client.primaryColor} onClick={handleConfirm}>
          Confirm Appointment
        </ConfirmButton>
      </ConfirmationActions>
    </ConfirmationContainer>
  );
};

export default Confirmation;

// Styled Components
const ConfirmationContainer = styled.div<{ boxShadowColor: string }>`
  max-width: 1200px;
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 6px ${({ boxShadowColor }) => boxShadowColor};
  margin: 0 auto;
  margin-top: 2rem;
`;

const ConfirmationHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const AppointmentDetails = styled.div`
  background-color: rgba(249, 250, 251, 0.7);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ConfirmationActions = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
`;

const ConfirmButton = styled.button<{ color: string }>`
  margin-top: 1rem;
  background-color: ${({ color }) => color};
  color: white;
  padding: 0.8rem 1.8rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ color }) => color};
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(71, 38, 163, 0.3);
  }
`;

const EditButton = styled.button<{ color: string }>`
  margin-top: 1rem;
  background-color: white;
  color: ${({ color }) => color};
  border: 1px solid ${({ color }) => color};
  padding: 0.8rem 1.8rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(139, 92, 246, 0.05);
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(71, 38, 163, 0.3);
  }
`;

// Animation for modal entrance
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Animation for checkmark
const checkmarkAnimation = keyframes`
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

// Modal overlay
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
`;

// Modal container
const ModalContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 3rem;
  max-width: 500px;
  width: 90%;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  animation: ${fadeIn} 0.4s ease-out;
  position: relative;
`;

// Success icon
const SuccessIcon = styled.div<{ color: string }>`
  width: 80px;
  height: 80px;
  background: ${({ color }) => color};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 2.5rem;

  svg {
    animation: ${checkmarkAnimation} 0.6s ease-out;
  }
`;

const ConfirmationIcon = styled.div<{ color: string }>`
  width: 50px;
  height: 50px;
  background: ${({ color }) => color};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 2.5rem;

  svg {
    animation: ${checkmarkAnimation} 0.6s ease-out;
  }
`;

// Modal title
const ModalTitle = styled.h2<{ color: string }>`
  font-size: 2rem;
  color: ${({ color }) => color};
  margin-bottom: 1rem;
  font-weight: 600;
`;

// Modal text
const ModalText = styled.p`
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

// Appointment summary
const SummaryItem = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
  font-size: 1.1rem;

  svg {
    color: ${({ color }) => color};
  }
`;

// Home button
const HomeButton = styled.button<{ color: string }>`
  background: ${({ color }) => color};
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1.5rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${({ color }) => color};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Notes = styled.div`
  margin-top: 1rem;
  background: #f4f4f4;
  padding: 1rem;
  border-left: 4px solid purple;
`;

/*********************************************************
  The colours in here will remain the same for all clients
 *********************************************************/

const ErrorContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff8f8;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  border-left: 5px solid #ff5252;
`;

const ErrorIcon = styled.div`
  color: #ff5252;
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ErrorTitle = styled.h2`
  color: #d32f2f;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  color: #5f2120;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ErrorDetails = styled.div`
  background: #ffebee;
  padding: 1rem;
  border-radius: 8px;
  margin: 1.5rem 0;
  text-align: left;
  color: #d32f2f;
  font-size: 0.95rem;

  div {
    margin: 0.5rem 0;
    padding-left: 1rem;
    border-left: 3px solid #ff5252;
  }
`;

const BackButton = styled.button`
  background: #ff5252;
  color: white;
  border: none;
  padding: 0.8rem 1.8rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  font-weight: 500;

  &:hover {
    background: #d32f2f;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;
