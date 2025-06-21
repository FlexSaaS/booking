import styled from "styled-components";
import { getClientConfig } from "../configs/getClientConfig";

const client = getClientConfig();

const Container = styled.div`
  max-width: 1000px;
  padding: 0rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${client.theme.backgroundColor};
  border-radius: 30px;
  width: 100%;
  overflow: hidden;
  position: relative;

  height: calc(100vh - 141px);
`;
export default Container;
