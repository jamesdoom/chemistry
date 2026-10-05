export type Spin = "up" | "down";
export type ElectronSlot = Spin | null;
export type OrbitalArrangement = Record<string, ElectronSlot[]>;
export interface Sublevel {
  label: string;
  orbitals: string[];
}
export interface OrbitalExercise {
  id: string;
  topicId: string;
  atomicNumber: number;
  symbol: string;
  name: string;
  prompt: string;
  hints: string[];
  walkthrough: string[];
}
export type OrbitalRule = "electron-count" | "aufbau" | "pauli" | "hund";
export interface OrbitalIssue {
  rule: OrbitalRule;
  title: string;
  message: string;
  orbitalIds: string[];
}
export interface OrbitalEvaluation {
  correct: boolean;
  electronCount: number;
  issues: OrbitalIssue[];
}
