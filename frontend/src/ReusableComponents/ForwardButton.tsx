import styled from "styled-components";
import { getClientConfig } from "../configs/getClientConfig";

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
    <Container>
      <StyledButton disabled={disabled} onClick={onClick} type={type}>
        {children}
      </StyledButton>
    </Container>
  );
}

export default ForwardButton;

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const StyledButton = styled.button<{ disabled?: boolean }>`
  margin-top: 2.5rem;
  background: ${({ disabled }) =>
    disabled ? "#ccc" : client.theme.primaryColor};
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
      disabled ? "#ccc" : client.theme.secondaryColor};
    transform: ${({ disabled }) => (disabled ? "none" : "scale(1.03)")};
  }

  /* Removed ::after pseudo-element */
`;
