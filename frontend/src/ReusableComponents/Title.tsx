import styled from "styled-components";
import { getClientConfig } from "../lib/getClientConfig";

const client = getClientConfig();

const Title = styled.h2`
  text-align: center;
  font-size: "2.25rem";
  font-weight: 700;
  margin-bottom: "2rem";
  color: ${client.theme.primaryColor};
  letter-spacing: 0.03em;
`;

export default Title;
