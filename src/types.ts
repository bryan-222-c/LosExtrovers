export interface User {
  username: string;
  coins: number;
  completedLevels: number[]; // e.g. [1, 2, 3] indicating level ids solved
  moduleUnlocks: number[]; // e.g. [1] modules unlocked
  predictions: Record<number, string>; // levelId -> choice for prediction
  submittedAnswers: Record<number, string>; // levelId -> choice made for Saber 11
  score: number; // overall ICFES score simulation
}

export interface PredictionSection {
  question: string;
  options: string[];
  explanation: Record<string, string>; // feedback per option
}

export interface Saber11Question {
  context: string;
  imageUrl?: string;
  imageSimulated?: string; // CSS style simulation of graph
  questionText: string;
  options: {
    key: string;
    text: string;
  }[];
  correctAnswer: string;
  pedagogicalFeedback: string;
}

export interface Level {
  id: number;
  title: string;
  narrative: string;
  conceptTitle: string;
  concepts: string[];
  prediction: PredictionSection;
  saber11: Saber11Question;
  xpReward: number;
  coinsReward: number;
}

export interface Module {
  id: number;
  name: string;
  codeName: string;
  description: string;
  totalLevels: number;
  icon: string;
  isActive: boolean;
}

export function isMasterUser(username?: string): boolean {
  if (!username) return false;
  const clean = username.trim().toLowerCase();
  return (
    clean === 'jojabravo@gmail.com' || 
    clean === 'jojabravo' ||
    clean === 'bryanconrado02@gmail.com' ||
    clean === 'bryanconrado02' ||
    clean === 'bryan conrado' ||
    clean === 'anfitrion' ||
    clean === 'anfitrión' ||
    clean === 'host' ||
    clean === 'admin' ||
    clean.includes('bryanconrado') ||
    clean.includes('jojabravo')
  );
}
