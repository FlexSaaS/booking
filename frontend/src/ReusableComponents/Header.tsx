import styled from "styled-components";
import { getClientConfig } from "../configs/getClientConfig";
import ProgressBar from "./ProgressBar";
import { Link } from "react-router-dom"; // ✅ Import Link

const client = getClientConfig();

function Header() {
  return (
    <Container>
      <Container2>
        <LogoLink to="/">
          <Logo src={client.logo} alt={`${client.name}'s profile`} />
        </LogoLink>
        <ProgressBar />
        <Blank />
      </Container2>
    </Container>
  );
}

export default Header;

const Container = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Container2 = styled.header`
  width: 100%;
  max-width: 1400px;
  display: flex;
  background-color: ${client.theme.thirdColor};
  border-radius: 75px;
  margin: 1rem;
  padding: 0.5rem 3rem;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    border-radius: 0px 0px 50px 50px;
    justify-content: center;
    margin: 0rem;
    flex-direction: column;
    padding: 2rem;
    gap: 2rem;
  }
`;

const Blank = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const Logo = styled.img`
  height: 80px;
  width: auto;
  object-fit: contain;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none; // removes underline
`;
