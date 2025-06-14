import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import type { Appointment } from "../../../types/Types";
import { getClientConfig } from "../../../configs/getClientConfig";
import ForwardButton from "../../../ReusableComponents/ForwardButton";

const client = getClientConfig();

export interface ClientFormData {
  name: string;
  email: string;
  phone: string;
  notes?: string;
}

interface Props {
  appointment: Partial<Appointment>;
  onSubmit: (data: ClientFormData) => void;
}

const STORAGE_KEY = "clientInfoForm";

function ClientForm({ appointment, onSubmit }: Props) {
  // Load saved values from localStorage or fallback to appointment data
  const savedData: ClientFormData = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "null"
  ) || {
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

  // Save form data to localStorage on change
  const watchedValues = watch();
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchedValues));
  }, [watchedValues]);

  // Clear storage after successful submit
  const internalOnSubmit = (data: ClientFormData) => {
    localStorage.removeItem(STORAGE_KEY);
    onSubmit(data);
  };

  return (
    <Form onSubmit={handleSubmit(internalOnSubmit)}>
      <FormGroup>
        <Label htmlFor="name">
          <FontAwesomeIcon icon={faUser} /> Full Name
        </Label>
        <Input
          id="name"
          type="text"
          {...register("name", { required: "Name is required" })}
          placeholder="Your name"
        />
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
        {errors.email && <Error>{errors.email.message}</Error>}
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
        {errors.phone && <Error>{errors.phone.message}</Error>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="notes">Special Requests (Optional)</Label>
        <Textarea
          id="notes"
          {...register("notes")}
          placeholder="Any special requests or notes for your stylist..."
          rows={3}
        />
      </FormGroup>

      <ForwardButton disabled={!isValid} type="submit">
        Confirm Appointment
      </ForwardButton>
    </Form>
  );
}

export default ClientForm;

const Form = styled.form`
  width: 100%;
  display: grid;
  gap: 1.75rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.6rem;
  font-weight: 600;
  color: ${client.theme.primaryColor};
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.05rem;
`;

const Input = styled.input`
  padding: 0.85rem 1rem;
  border: 1.8px solid #ddd;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
  &:focus {
    border-color: ${client.theme.secondaryColor};
    box-shadow: 0 0 6px ${client.theme.secondaryColor}55;
    outline: none;
  }
`;

const Textarea = styled.textarea`
  padding: 0.85rem 1rem;
  border: 1.8px solid #ddd;
  border-radius: 10px;
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
  &:focus {
    border-color: ${client.theme.secondaryColor};
    box-shadow: 0 0 6px ${client.theme.secondaryColor}55;
    outline: none;
  }
`;

const Error = styled.span`
  color: #d93025;
  font-size: 0.85rem;
  margin-top: 0.35rem;
  font-weight: 600;
  letter-spacing: 0.02em;
`;
