import { orbitalExercises } from "./practice/orbitals.ts";
import { atomicProperties } from "../utils/atomicProperties.ts";
export const periodicGroups = [1, 2, 13, 14, 15, 16, 17, 18];
export const periodicAtoms = orbitalExercises.map(
  ({ atomicNumber, symbol, name }) => ({
    atomicNumber,
    symbol,
    name,
    ...atomicProperties(atomicNumber),
  }),
);
