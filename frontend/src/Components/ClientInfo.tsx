import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faUser, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import type { Appointment } from "../types/Config";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import type { getClientConfig } from "../lib/getClientConfig";

interface ClientInfoProps {
  appointment: Partial<Appointment>;
    updateAppointment: (data: Partial<Appointment>) => void;
    client: ReturnType<typeof getClientConfig>;
}

interface ClientFormData {
  name: string;
  email: string;
  phone: string;
  notes?: string;
}

const STORAGE_KEY = "clientInfoForm";

const ClientInfo: React.FC<ClientInfoProps> = ({ appointment, updateAppointment, client }) => {
  const navigate = useNavigate();

  // Load saved values from localStorage if available
  const savedData: ClientFormData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || {
    name: appointment.client?.name ?? "",
    email: appointment.client?.email ?? "",
    phone: appointment.client?.phone ?? "",
    notes: appointment.notes ?? "",
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<ClientFormData>({
    defaultValues: savedData,
    mode: "onChange",
  });

  // Watch all form fields and save to localStorage on change
  const watchedValues = watch();
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchedValues));
  }, [watchedValues]);

  const onSubmit = (data: ClientFormData) => {
    updateAppointment({
      client: {
        name: data.name,
        email: data.email,
        phone: data.phone,
      },
      notes: data.notes,
    });

    // Clear the localStorage since the form is done
    localStorage.removeItem(STORAGE_KEY);

    navigate("/confirmation");
  };

  function prevStep() {
    navigate("/time");
  }

  return (
    <ClientInfoContainer boxShadowColor={client.boxShadowColor || "rgba(0, 0, 0, 0.1)"}>
      <BackButton onClick={prevStep}>
        <FontAwesomeIcon icon={faChevronLeft} /> Back to Date & Time
      </BackButton>

      <Heading>Your Information</Heading>
      <AppointmentSummary>
        {appointment.service} on{" "}
        {appointment.date &&
          new Date(appointment.date).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}{" "}
        at {appointment.time}
      </AppointmentSummary>

      <ClientForm onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="name">
            <FontAwesomeIcon icon={faUser} /> Full Name
          </Label>
          <Input id="name" type="text" {...register("name", { required: "Name is required" })} placeholder="Your name" />
          {errors.name && <Error>{errors.name.message}</Error>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">
            <FontAwesomeIcon icon={faEnvelope} /> Email
          </Label>
          <Input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="youremail@gmail.com"
          />
          {errors.email && <Error color={client.primaryRed}>{errors.email.message}</Error>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="phone">
            <FontAwesomeIcon icon={faPhone} /> Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                message: "Invalid phone number",
              },
            })}
            placeholder="009977331232"
          />
          {errors.phone && <Error color={client.primaryRed}>{errors.phone.message}</Error>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="notes">Special Requests (Optional)</Label>
          <Textarea id="notes" {...register("notes")} placeholder="Any special requests or notes for your stylist..." rows={3} />
        </FormGroup>

        <NavigationButtons>
          <ContinueButton color={client.primaryColor} boxShadowColor={client.boxShadowColor} disabled={!isValid} type="submit">
            Confirm Appointment
          </ContinueButton>
        </NavigationButtons>
      </ClientForm>
    </ClientInfoContainer>
  );
};

export default ClientInfo;

// Styled Components
const ClientInfoContainer = styled.div<{ boxShadowColor: string }>`
  max-width: 900px;
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 6px ${({ boxShadowColor }) => boxShadowColor};
  margin: 0 auto;
  margin-top: 2rem;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  padding: 0.5rem 0;

  &:hover {
    color: #333;
  }
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const AppointmentSummary = styled.p`
  text-align: center;
  margin-bottom: 2rem;
  color: #555;
  font-size: 1.1rem;
`;

const ClientForm = styled.form`
  display: grid;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
`;

const Textarea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
`;

const Error = styled.span<{ color?: string }>`
  color: ${({ color }) => color};
  font-size: 0.8rem;
  margin-top: 0.3rem;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const ContinueButton = styled.button<{ color: string, boxShadowColor?: string }>`
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

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
