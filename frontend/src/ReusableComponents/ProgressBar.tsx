import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faCircleCheck,
  faHandHoldingHeart,
  faHome,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
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
      <StyledLink to="/">
        <ProgressStep status={getStatus("/")}>
          <IconWrapper>
            <FontAwesomeIcon icon={faHome} />
          </IconWrapper>
          <span>Home</span>
        </ProgressStep>
      </StyledLink>

      <ProgressConnector status={getStatus("/")} />

      <StyledLink to="/services">
        <ProgressStep status={getStatus("/services")}>
          <IconWrapper>
            <FontAwesomeIcon icon={faHandHoldingHeart} />
          </IconWrapper>
          <span>Services</span>
        </ProgressStep>
      </StyledLink>

      <ProgressConnector status={getStatus("/services")} />

      <StyledLink to="/calendar">
        <ProgressStep status={getStatus("/calendar")}>
          <IconWrapper>
            <FontAwesomeIcon icon={faCalendarAlt} />
          </IconWrapper>
          <span>Date</span>
        </ProgressStep>
      </StyledLink>

      <ProgressConnector status={getStatus("/calendar")} />

      <StyledLink to="/details">
        <ProgressStep status={getStatus("/details")}>
          <IconWrapper>
            <FontAwesomeIcon icon={faUser} />
          </IconWrapper>
          <span>Details</span>
        </ProgressStep>
      </StyledLink>

      <ProgressConnector status={getStatus("/details")} />

      <StyledLink to="/confirmation">
        <ProgressStep status={getStatus("/confirmation")}>
          <IconWrapper>
            <FontAwesomeIcon icon={faCircleCheck} />
          </IconWrapper>
          <span>Confirm</span>
        </ProgressStep>
      </StyledLink>
    </ProgressBarWrapper>
  );
}

export default ProgressBar;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  flex: 1;
`;

const ProgressConnector = styled.div<ProgressBarSteps>`
  flex: 0.7;
  height: 2px;
  background-color: ${({ status }) =>
    status === "completed"
      ? client.theme.secondaryColor
      : client.theme.fourthColor};

  transition: background-color 0.3s ease;
  transform: translateY(-8px);
`;

const ProgressBarWrapper = styled.nav`
  display: flex;
  align-items: center;
  width: 50%;
  padding: 1rem 0;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
  }
`;

const ProgressStep = styled.div<ProgressBarSteps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  flex: 1;
  min-width: 60px;
  text-align: center;

  ${({ status }) => {
    switch (status) {
      case "completed":
        return css`
          color: ${client.theme.secondaryColor};

          ${IconWrapper} {
            background-color: ${client.theme.secondaryColor};
          }

          svg {
            color: ${client.theme.primaryColor};
          }
        `;
      case "active":
        return css`
          color: ${client.theme.primaryColor};
          font-weight: 600;

          ${IconWrapper} {
            background-color: ${client.theme.primaryColor};
          }

          svg {
            color: ${client.theme.secondaryColor};
          }
        `;
      default:
        return css`
          color: ${client.theme.fourthColor};

          ${IconWrapper} {
            background-color: ${client.theme.fourthColor};
          }

          svg {
            color: ${client.theme.primaryColor};
          }
        `;
    }
  }}
`;

const IconWrapper = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  svg {
    font-size: 1.2rem;
  }
`;
