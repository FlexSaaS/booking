import styled, { keyframes } from "styled-components";
import { getClientConfig } from "../configs/getClientConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const client = getClientConfig();

interface Props {
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
}

function ForwardButton({
  disabled,
  onClick,
  type = "button",
  children,
}: Props) {
  return (
    <StyledButton
      disabled={disabled}
      onClick={onClick}
      type={type}
      $pulse={!disabled}
    >
      {children}
      <Arrow icon={faArrowRight} aria-hidden="true" focusable="false" />
    </StyledButton>
  );
}

export default ForwardButton;

const arrowSlide = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-10px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 rgba(0,0,0,0);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(0,0,0,0.25);
  }
`;

const StyledButton = styled.button<{ disabled?: boolean; $pulse: boolean }>`
  width: 280px;
  margin-top: 1.5rem;
  background: ${({ disabled }) =>
    disabled
      ? "#ccc"
      : `linear-gradient(135deg, ${client.theme.primaryColor} 50%, ${client.theme.thirdColor} 100%)`};
  color: white;
  padding: 0.75rem 2.5rem 0.75rem 2rem;
  border: none;
  border-radius: 50px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: 1.1rem;
  font-weight: 700;
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;

  animation: ${({ $pulse }) => ($pulse ? pulse : "none")} 2.5s infinite
    ease-in-out;

  &:hover {
    background: ${({ disabled }) =>
      disabled
        ? "#ccc"
        : `linear-gradient(135deg, ${client.theme.thirdColor} 0%, ${client.theme.primaryColor} 50%)`};
    transform: ${({ disabled }) => (disabled ? "none" : "scale(1.05)")};
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 6px 20px rgba(0, 0, 0, 0.3)"};

    svg {
      animation: ${arrowSlide} 0.3s forwards;
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const Arrow = styled(FontAwesomeIcon)`
  margin-left: 15px;
  margin-right: -20px;
  font-size: 1.2rem;
  opacity: 0;
  transform: translateX(-10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
`;
