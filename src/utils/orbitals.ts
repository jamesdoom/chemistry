import { sublevels } from "../data/practice/orbitals.ts";
import type {
  ElectronSlot,
  OrbitalArrangement,
  OrbitalEvaluation,
  OrbitalIssue,
} from "../types/orbitals";
export function emptyArrangement(): OrbitalArrangement {
  return Object.fromEntries(
    sublevels.flatMap((s) => s.orbitals.map((id) => [id, [null, null]])),
  );
}
export function occupiedSlots(
  arrangement: OrbitalArrangement,
  id: string,
): ElectronSlot[] {
  return (arrangement[id] ?? []).filter((spin) => spin !== null);
}
export function electronCount(arrangement: OrbitalArrangement): number {
  return sublevels.reduce(
    (sum, s) =>
      sum +
      s.orbitals.reduce(
        (n, id) => n + occupiedSlots(arrangement, id).length,
        0,
      ),
    0,
  );
}
export function configurationParts(
  arrangement: OrbitalArrangement,
): { label: string; count: number }[] {
  return sublevels
    .map((s) => ({
      label: s.label,
      count: s.orbitals.reduce(
        (sum, id) => sum + occupiedSlots(arrangement, id).length,
        0,
      ),
    }))
    .filter((s) => s.count > 0);
}
// Canonical solution for neutral ground-state atoms H–Ar. Validation below also
// accepts equivalent p-box permutations and globally reversed unpaired spins.
export function solutionArrangement(atomicNumber: number): OrbitalArrangement {
  if (!Number.isInteger(atomicNumber) || atomicNumber < 1 || atomicNumber > 18)
    throw new RangeError("Only neutral atoms 1–18 are supported.");
  const result = emptyArrangement();
  let remaining = atomicNumber;
  for (const sublevel of sublevels) {
    const count = Math.min(remaining, sublevel.orbitals.length * 2);
    for (let i = 0; i < count; i++) {
      const id = sublevel.orbitals[i % sublevel.orbitals.length]!;
      const slot = i < sublevel.orbitals.length ? 0 : 1;
      result[id]![slot] = slot === 0 ? "up" : "down";
    }
    remaining -= count;
  }
  return result;
}
export function evaluateArrangement(
  arrangement: OrbitalArrangement,
  atomicNumber: number,
): OrbitalEvaluation {
  if (!Number.isInteger(atomicNumber) || atomicNumber < 1 || atomicNumber > 18)
    throw new RangeError("Only neutral atoms 1–18 are supported.");
  const count = electronCount(arrangement);
  const issues: OrbitalIssue[] = [];
  if (count !== atomicNumber)
    issues.push({
      rule: "electron-count",
      title: "Check the electron count",
      message: `You placed ${count} electrons; this neutral atom needs ${atomicNumber}. ${count < atomicNumber ? "Add the missing electrons" : "Remove the extra electrons"}, then check how they are arranged.`,
      orbitalIds: [],
    });
  for (const sublevel of sublevels) {
    for (const id of sublevel.orbitals) {
      const spins = occupiedSlots(arrangement, id);
      if (spins.length > 2 || (spins.length === 2 && spins[0] === spins[1]))
        issues.push({
          rule: "pauli",
          title: "Pauli exclusion principle",
          message:
            spins.length > 2
              ? `${sublevel.label}, orbital ${sublevel.orbitals.indexOf(id) + 1}, contains more than two electrons. Each orbital can hold at most two.`
              : `${sublevel.label}, orbital ${sublevel.orbitals.indexOf(id) + 1}, has two electrons with the same spin. Two electrons sharing an orbital must have opposite spins. Change one arrow’s direction.`,
          orbitalIds: [id],
        });
    }
  }
  for (let i = 0; i < sublevels.length - 1; i++) {
    const lower = sublevels[i]!;
    const lowerCount = lower.orbitals.reduce(
      (sum, id) => sum + occupiedSlots(arrangement, id).length,
      0,
    );
    const occupiedHigher = sublevels
      .slice(i + 1)
      .filter((s) =>
        s.orbitals.some((id) => occupiedSlots(arrangement, id).length),
      );
    if (lowerCount < lower.orbitals.length * 2 && occupiedHigher.length) {
      issues.push({
        rule: "aufbau",
        title: "Aufbau principle",
        message: `There are electrons in ${occupiedHigher.map((s) => s.label).join(", ")} while ${lower.label} still has room. For the ground state, finish the lower-energy ${lower.label} sublevel first.`,
        orbitalIds: [
          ...lower.orbitals,
          ...occupiedHigher.flatMap((s) =>
            s.orbitals.filter((id) => occupiedSlots(arrangement, id).length),
          ),
        ],
      });
      break; // Teach the earliest skipped sublevel first.
    }
  }
  for (const sublevel of sublevels.filter((s) => s.orbitals.length > 1)) {
    const occupied = sublevel.orbitals.map((id) => ({
      id,
      spins: occupiedSlots(arrangement, id),
    }));
    const earlyPair =
      occupied.some((o) => o.spins.length >= 2) &&
      occupied.some((o) => o.spins.length === 0);
    const singles = occupied.filter((o) => o.spins.length === 1);
    const mixedSpins = new Set(singles.map((o) => o.spins[0])).size > 1;
    if (earlyPair || mixedSpins)
      issues.push({
        rule: "hund",
        title: "Hund’s rule",
        message: earlyPair
          ? `In ${sublevel.label}, electrons are paired while another orbital is empty. Place one electron in each of its three equal-energy orbitals before making pairs.`
          : `The unpaired electrons in ${sublevel.label} point in different directions. In the ground state, unpaired electrons in the same sublevel have parallel spins. Make those arrows point the same way; all up or all down works.`,
        orbitalIds: sublevel.orbitals,
      });
  }
  return { correct: issues.length === 0, electronCount: count, issues };
}
