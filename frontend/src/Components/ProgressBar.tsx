import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faCircleCheck,
  faScissors,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import styled, { css } from "styled-components";
import { getClientConfig } from "../lib/getClientConfig";

interface ProgressStepProps {
  status?: "active" | "completed" | "default";
  client: ReturnType<typeof getClientConfig>;
}

interface ProgressBarProps {
  client: ReturnType<typeof getClientConfig>;
}

function ProgressBar({ client }: ProgressBarProps) {
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (step: string) => {
    const order = ["/service", "/time", "/client", "/confirmation"];
    const currentIndex = order.indexOf(pathname);
    const stepIndex = order.indexOf(step);
    return currentIndex >= stepIndex;
  };

  return (
    <ProgressBarWrapper client={client}>
      <ProgressStep
        status={isActive("/service") ? "active" : undefined}
        client={client}
      >
        <FontAwesomeIcon icon={faScissors} />
        <span>Service</span>
      </ProgressStep>

      <ProgressStep
        status={isActive("/time") ? "active" : undefined}
        client={client}
      >
        <FontAwesomeIcon icon={faCalendarAlt} />
        <span>Date</span>
      </ProgressStep>

      <ProgressStep
        status={isActive("/client") ? "active" : undefined}
        client={client}
      >
        <FontAwesomeIcon icon={faUser} />
        <span>Details</span>
      </ProgressStep>

      <ProgressStep
        status={isActive("/confirmation") ? "active" : undefined}
        client={client}
      >
        <FontAwesomeIcon icon={faCircleCheck} />
        <span>Confirm</span>
      </ProgressStep>
    </ProgressBarWrapper>
  );
}

export default ProgressBar;

// Add client prop type
const ProgressBarWrapper = styled.div<{
  client: ReturnType<typeof getClientConfig>;
}>`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  position: relative;
  padding: 0 1rem;

  &::before {
    content: "";
    position: absolute;
    top: 20px;
    left: 50px;
    right: 50px;
    height: 3px;
    background-color: ${(props) => props.client.lightGray || "#f5f5f7"};
    z-index: 1;
  }
`;

export const ProgressStep = styled.div<ProgressStepProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;

  svg {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${(props) => props.client.primaryWhite || "#f5f5f7"};
    border-radius: 50%;
    padding: 8px;
    margin-bottom: 0.5rem;
    color: ${(props) => props.client.darkGray || "#6b7280"};
    border: 3px solid ${(props) => props.client.lightGray || "#f5f5f7"};
    transition: all 0.3s ease;

    ${({ status, client }) =>
      (status === "active" || status === "completed") &&
      css`
        color: ${client.primaryWhite || "#ffffff"};
        background-color: ${client.primaryColor || "#4a2db5"};
        border-color: ${client.primaryColor || "#4a2db5"};
      `}
  }

  span {
    font-size: 0.9rem;
    color: ${(props) => props.client.darkGray || "#6b7280"};
    font-weight: 500;
    position: absolute;
    bottom: -25px;
    white-space: nowrap;

    ${({ status, client }) =>
      (status === "active" || status === "completed") &&
      css`
        color: ${client.primaryDark || "#4a2db5"};
        font-weight: 600;
      `}
  }

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 20px;
    left: 50%;
    width: 100%;
    height: 3px;
    background-color: ${(props) => props.client.lightGray || "#f5f5f7"};
    z-index: -1;

    ${({ status, client }) =>
      status === "completed" &&
      css`
        background-color: ${client.primaryColor || "#4a2db5"};
      `}
  }
`;
