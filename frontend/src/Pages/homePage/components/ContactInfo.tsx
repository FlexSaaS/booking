import styled from "styled-components";
import { getClientConfig } from "../../../configs/getClientConfig";

const client = getClientConfig();

function ContactInfo() {
  return (
    <Info>
      <p>
        <strong>Phone:</strong>
        {client.phone}
      </p>
      <p>
        <strong>Email:</strong> {client.email}
      </p>
      <p>
        <strong>Address:</strong> {client.address}
      </p>
    </Info>
  );
}

export default ContactInfo;

const Info = styled.div`
  margin-top: 2rem;
  font-size: 1rem;
  line-height: 1.6;
  color: #444;
  p {
    margin: 0.4rem 0;
  }
`;
