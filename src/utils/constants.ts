export const CELL_SIZE = 30;

export type Difficulty = 'beginner' | 'intermediate' | 'expert' | 'nightmare';

export const DIFFICULTY_CONFIGS = {
  beginner: {
    name: 'Beginner',
    emoji: '🌱',
    columns: 9,
    rows: 9,
    mines: 10,
    description: 'Perfect for learning'
  },
  intermediate: {
    name: 'Intermediate', 
    emoji: '⚡',
    columns: 16,
    rows: 16,
    mines: 40,
    description: 'Moderate challenge'
  },
  expert: {
    name: 'Expert',
    emoji: '🔥',
    columns: 30,
    rows: 16,
    mines: 99,
    description: 'For seasoned players'
  },
  nightmare: {
    name: 'Nightmare',
    emoji: '💀',
    columns: 24,
    rows: 20,
    mines: 150,
    description: 'Only for the brave'
  }
} as const;
