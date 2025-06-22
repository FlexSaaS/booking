import styled from "styled-components";
import { getClientConfig } from "../../../configs/getClientConfig";

const client = getClientConfig();

function Map() {
  return (
    <MapWrapper>
      <iframe
        src={client.location}
        referrerPolicy="no-referrer-when-downgrade"
        style={{ border: 0, width: "100%", height: "100%" }}
        allowFullScreen
        loading="lazy"
        title="Location Map"
      />
    </MapWrapper>
  );
}

export default Map;

const MapWrapper = styled.div`
  width: 100%;
  height: 600px;
  @media (max-width: 768px) {
    height: 800px;
  }
`;
