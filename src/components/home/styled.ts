import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  place-items: center;
  margin-top: 50px;
  gap: 20px;
`;

export const ContainerButton = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
