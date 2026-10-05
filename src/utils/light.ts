// Rounded constants used consistently in this introductory lesson.
export const LIGHT_SPEED = 3.0e8;
export const PLANCK_CONSTANT = 6.626e-34;
export function lightProperties(wavelengthNm: number) {
  const wavelengthM = wavelengthNm * 1e-9;
  const frequency = LIGHT_SPEED / wavelengthM;
  return { wavelengthM, frequency, photonEnergy: PLANCK_CONSTANT * frequency };
}
export function gradeNumericAnswer(
  input: string,
  target: number,
  relativeTolerance: number,
): { correct: boolean; feedback?: string } {
  // Accept a number only; units are supplied by each prompt. Never evaluate input as code.
  const value = input.trim().replace(/−/g, "-");
  if (!/^[+]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(value))
    return {
      correct: false,
      feedback:
        "Enter a positive number only, using e for scientific notation (for example, 2.5e14). The prompt supplies the units.",
    };
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0)
    return {
      correct: false,
      feedback:
        "The frequency or photon energy must be a finite positive number. Check your exponent.",
    };
  return {
    correct: Math.abs(number - target) <= Math.abs(target) * relativeTolerance,
  };
}
