import BackButton from "./BackButton";
import Title from "./Title";
import styled from "styled-components";

interface SubHeaderProps {
  to: string;
  title: string;
}

function SubHeader({ to, title }: SubHeaderProps) {
  return (
    <Wrapper>
      <BackButton to={to}>Back</BackButton>
      <Title>{title}</Title>
      <RightPlaceholder />
    </Wrapper>
  );
}

export default SubHeader;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  padding: 1rem 0rem;
`;

const RightPlaceholder = styled.div`
  width: 80px;
  @media (max-width: 768px) {
    display: none;
  }
`;
