export type TrendProperty = "size" | "ionization";
export interface TrendComparison {
  id: string;
  property: TrendProperty;
  title: string;
  atomicNumbers: [number, number];
  favoredAtomicNumber: number;
  explanation: string;
  reason: string;
  exception?: boolean;
}
