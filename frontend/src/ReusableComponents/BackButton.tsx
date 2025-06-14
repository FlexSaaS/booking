import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { getClientConfig } from "../lib/getClientConfig";

const client = getClientConfig();

interface BackButtonProps {
  to: string;
  children: React.ReactNode;
}

function BackButton({ to, children = "Back" }: BackButtonProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(to);
  };

  return (
    <StyledButton onClick={handleBack}>
      <FontAwesomeIcon icon={faChevronLeft} />
      <span>{children}</span>
    </StyledButton>
  );
}

export default BackButton;

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1.5rem;
  background: ${client.theme.primaryColor};
  border: none;
  border-radius: 9999px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;

  svg {
    font-size: 1.2rem;
    transition: transform 0.3s ease;
  }

  &:hover {
    filter: brightness(1.1);
    transform: scale(1.05);

    svg {
      transform: translateX(-3px);
    }
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid ${client.theme.secondaryColor};
    outline-offset: 4px;
  }
`;
