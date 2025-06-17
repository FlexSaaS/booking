import styled from "styled-components";
import { getClientConfig } from "../../../configs/getClientConfig";

const client = getClientConfig();

function Description() {
  return <Desc>{client.tagline}</Desc>;
}

export default Description;

const Desc = styled.p`
  font-size: 1.1rem;
  margin-top: 0.6rem;
  color: #555;
  max-width: 420px;
  margin-left: auto;
  margin-right: auto;
`;
