import styled from "styled-components";

export const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const SelectorTitle = styled.h2`
  margin: 0;
  text-align: center;
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.025em;
`;

export const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const DifficultyButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.25rem;
  background: ${props => props.$isActive 
    ? 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' 
    : 'rgba(255, 255, 255, 0.95)'};
  border: 2px solid ${props => props.$isActive ? '#ff9a56' : 'transparent'};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.$isActive 
    ? '0 8px 25px rgba(255, 154, 86, 0.3)' 
    : '0 4px 15px rgba(0, 0, 0, 0.1)'};
  transform: ${props => props.$isActive ? 'translateY(-2px) scale(1.02)' : 'translateY(0)'};

  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    background: ${props => props.$isActive 
      ? 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' 
      : 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'};
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }

  .emoji {
    font-size: 2rem;
    margin-bottom: 0.25rem;
  }

  .name {
    font-size: 1.1rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.25rem;
  }

  .description {
    font-size: 0.875rem;
    color: #718096;
    text-align: center;
    margin-bottom: 0.5rem;
    font-style: italic;
  }

  .stats {
    font-size: 0.75rem;
    color: #4a5568;
    font-weight: 500;
    background: rgba(0, 0, 0, 0.05);
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
  }
`;

export const DifficultyInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }

  .reset-button {
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(238, 90, 82, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(238, 90, 82, 0.4);
    }

    &:active {
      transform: translateY(0);
    }
  }
`;

export const GameStats = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }

  .label {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
  }

  .value {
    font-size: 1.125rem;
    font-weight: 700;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

    &.status-running {
      color: #4ade80;
    }

    &.status-won {
      color: #fbbf24;
    }

    &.status-lost {
      color: #f87171;
    }
  }
`;