import { solutionArrangement, configurationParts } from "./orbitals.ts";
export interface AtomicProperties {
  configuration: { label: string; count: number }[];
  period: number;
  valenceElectrons: number;
  group: number;
}
// Restricted to neutral ground-state H–Ar: their valence electrons occupy the
// highest principal energy level. Transition-element rules are outside scope.
export function atomicProperties(atomicNumber: number): AtomicProperties {
  const configuration = configurationParts(solutionArrangement(atomicNumber));
  const period = Math.max(
    ...configuration.map((part) => Number(part.label[0])),
  );
  const valenceElectrons = configuration
    .filter((part) => Number(part.label[0]) === period)
    .reduce((sum, part) => sum + part.count, 0);
  const group =
    atomicNumber === 2
      ? 18
      : valenceElectrons <= 2
        ? valenceElectrons
        : valenceElectrons + 10;
  return { configuration, period, valenceElectrons, group };
}
