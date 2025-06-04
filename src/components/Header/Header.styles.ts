import styled from "styled-components";

export const HeaderComponent = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: white;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.025em;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;
