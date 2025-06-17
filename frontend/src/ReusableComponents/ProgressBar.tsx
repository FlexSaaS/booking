import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faCircleCheck, faHandHoldingHeart, faHome, faScissors, faUser } from "@fortawesome/free-solid-svg-icons";
import styled, { css } from "styled-components";
import { getClientConfig } from "../configs/getClientConfig";

const client = getClientConfig();

interface ProgressBarSteps {
  status?: "active" | "completed" | "default";
}

function ProgressBar() {
  const location = useLocation();
  const pathname = location.pathname;

  const getStatus = (step: string) => {
    const order = ["/", "/services", "/calendar", "/details", "/confirmation"];
    const currentIndex = order.indexOf(pathname);
    const stepIndex = order.indexOf(step);

    if (stepIndex < 0) return "default"; // fallback if not found

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "active";
    return "default";
  };

  return (
    <ProgressBarWrapper>
      <ProgressStep status={getStatus("/")}>
        <FontAwesomeIcon icon={faHome} />
        <span>Home</span>
      </ProgressStep>
      <ProgressStep status={getStatus("/services")}>
        <FontAwesomeIcon icon={faHandHoldingHeart} />
        <span>Service</span>
      </ProgressStep>

      <ProgressStep status={getStatus("/calendar")}>
        <FontAwesomeIcon icon={faCalendarAlt} />
        <span>Date</span>
      </ProgressStep>

      <ProgressStep status={getStatus("/details")}>
        <FontAwesomeIcon icon={faUser} />
        <span>Details</span>
      </ProgressStep>

      <ProgressStep status={getStatus("/confirmation")}>
        <FontAwesomeIcon icon={faCircleCheck} />
        <span>Confirm</span>
      </ProgressStep>
    </ProgressBarWrapper>
  );
}

export default ProgressBar;

const ProgressBarWrapper = styled.div`
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
    background-color: ${client.theme.backgroundColor};
    z-index: 1;
  }
`;

export const ProgressStep = styled.div<ProgressBarSteps>`
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
    background: ${({ status }) =>
      status === "active" || status === "completed"
        ? client.theme.primaryColor
        : client.theme.backgroundColor};
    border-radius: 50%;
    padding: 8px;
    margin-bottom: 0.5rem;
    color: ${({ status }) =>
      status === "active" || status === "completed"
        ? "#fff"
        : client.theme.primaryColor};
    border: 3px solid ${client.theme.primaryColor};
    transition: all 0.3s ease;
  }

  span {
    font-size: 0.9rem;
    color: ${client.theme.primaryColor};
    font-weight: 500;
    position: absolute;
    bottom: -25px;
    white-space: nowrap;
  }

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 20px;
    left: 50%;
    width: 900%;
    height: 3px;
    background-color: ${({ status }) =>
      status === "completed"
        ? client.theme.primaryColor
        : client.theme.backgroundColor};
    z-index: -1;
  }
`;
