import styled, { css, keyframes } from "styled-components";
import { getClientConfig } from "../../../configs/getClientConfig";

const client = getClientConfig();

function ProfilePicture() {
  return (
    <>
      {" "}
      <ProfileImageContainer>
        <Decoration />
        <ProfileImage
          src={client.logo}
          alt={`${client.name}'s profile`}
          $animate={client.animateProfile}
        />
      </ProfileImageContainer>
    </>
  );
}

export default ProfilePicture;

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const ProfileImageContainer = styled.div`
  position: relative;
  margin: 0 auto;
  width: 180px;
  height: 180px;
`;

interface ProfileImageProps {
  $animate: boolean;
}

const ProfileImage = styled.img<ProfileImageProps>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid ${client.theme.primaryColor};
  box-shadow: 0 10px 30px ${client.theme.primaryColor}33;
  animation: ${fadeIn} 0.8s ease-out forwards;
  transition: all 0.3s ease;
`;

const Decoration = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: ${client.animateProfile
    ? ` 2px dashed ${client.theme.primaryColor}33`
    : "none"};
  top: -10px;
  left: -10px;
  animation: spin 20s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
