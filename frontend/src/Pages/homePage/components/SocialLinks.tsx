import styled from "styled-components";
import { getClientConfig } from "../../../configs/getClientConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

const client = getClientConfig();

function SocialLinks() {
  return (
    <Links>
      <SocialLink href="#" aria-label="Instagram">
        <FontAwesomeIcon icon={faInstagram} />
      </SocialLink>
      <SocialLink href="#" aria-label="Facebook">
        <FontAwesomeIcon icon={faFacebook} />
      </SocialLink>
    </Links>
  );
}

export default SocialLinks;

const Links = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const SocialLink = styled.a`
  color: ${client.theme.primaryColor};
  font-size: 1.5rem;
  transition: all 0.3s ease;
  &:hover {
    color: ${client.theme.secondaryColor};
    transform: scale(1.2);
    transform: translateY(-3px);
  }
`;
