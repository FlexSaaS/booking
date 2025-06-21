import styled from "styled-components";
import { getClientConfig } from "../configs/getClientConfig";

const client = getClientConfig();

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: ${client.theme.primaryColor};
  letter-spacing: 0.03em;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

export default Title;
