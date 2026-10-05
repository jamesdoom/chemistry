import type { Lesson } from "../../types/curriculum";
export const lightLesson: Lesson = {
  id: "energy-light",
  topicId: "11.1-1",
  title: "Energy and Light: spacing, frequency, photons",
  subtitle:
    "Section 11.1 · Wave relationships and photon energy · About 15 minutes",
  summary:
    "In a vacuum, c = λν links wavelength to frequency. E = hν links frequency to energy per photon. Convert lengths to meters before calculating, and keep photon energy separate from beam intensity.",
  completionActions: [
    { label: "Continue to atomic emission →", to: "/lessons/atomic-emission" },
    {
      label: "Review Rutherford’s evidence →",
      to: "/lessons/rutherford",
    },
  ],
  steps: [
    {
      id: "concept",
      kind: "explanation",
      title: "Distance, timing, and tiny packets of energy",
      text: "Light is electromagnetic radiation. Wavelength λ (lambda) measures crest-to-crest distance. Frequency ν (nu) counts cycles passing one point each second, measured in hertz (Hz = s⁻¹). Light also transfers energy in photons. Each photon has energy E = hν. In a vacuum, all these wavelengths travel at the same speed c, so c = λν.",
      chain: [
        "Shorter wavelength",
        "Higher frequency",
        "Greater photon energy",
      ],
      explanations: [
        {
          label: "Simpler explanation",
          text: "Wavelength is a distance. Frequency is how often a cycle arrives. At the same speed, closely spaced crests arrive more often.",
        },
        {
          label: "Visual explanation",
          text: "Compare two waves over the same distance: the one with shorter crest spacing fits more cycles in that distance. At the same speed, more cycles pass a fixed point each second.",
        },
        {
          label: "Concrete analogy",
          text: "Imagine evenly spaced cars moving at the same speed. Smaller gaps mean more cars pass you each second. This helps with spacing and rate; light is not made of cars, and each photon’s energy follows E = hν.",
        },
        {
          label: "Worked example",
          text: "Light at 400 nm has half the wavelength of light at 800 nm. In a vacuum it has twice the frequency, so each 400 nm photon carries twice as much energy.",
        },
      ],
      continueLabel: "Explore the wave →",
    },
    {
      id: "wave",
      kind: "wave-explorer",
      title: "Change spacing, then change height",
      text: "Compare shorter and longer wavelengths. Then keep wavelength fixed and change amplitude. Watch which readouts change. Values use c = 3.00 × 10⁸ m/s and h = 6.626 × 10⁻³⁴ J·s.",
      continueLabel: "Work through a comparison →",
    },
    {
      id: "comparison",
      kind: "example",
      title: "Compare 450 nm with 650 nm",
      steps: [
        "Prediction: 450 nm has shorter crest spacing, so it has a higher frequency than 650 nm light in a vacuum.",
        "The speed is the same. From ν = c/λ, dividing by the smaller wavelength gives a larger frequency.",
        "From E = hν, the higher frequency means more energy in each 450 nm photon.",
        "Brightness is a separate comparison. A more intense 650 nm beam can deliver more total energy while each of its photons still has less energy than a 450 nm photon.",
      ],
      continueLabel: "Try the concept checks →",
    },
    {
      id: "practice-inverse",
      kind: "practice",
      title: "Predict before calculating",
      question: {
        id: "light-inverse",
        topicId: "11.1-1",
        prompt: "For light in a vacuum, what happens when wavelength doubles?",
        choices: [
          {
            value: "0",
            label: "Frequency doubles.",
          },
          {
            value: "1",
            label: "Frequency halves.",
          },
          {
            value: "2",
            label: "Frequency stays the same.",
          },
        ],
        answer: "1",
        explanation:
          "Frequency halves because wavelength × frequency must remain equal to c.",
        hints: [
          {
            text: "Use c = λν; c remains fixed in a vacuum.",
          },
          {
            text: "If one factor doubles, what happens to the other factor to keep their product fixed?",
          },
        ],
        misconceptionFeedback: {
          "0": "At fixed light speed, wavelength and frequency vary in opposite directions.",
          "2": "The speed stays constant, but the frequency changes when wavelength changes.",
        },
        workedSolution: [
          "Use c = λν; c remains fixed in a vacuum.",
          "If one factor doubles, what happens to the other factor to keep their product fixed?",
          "Frequency halves because wavelength × frequency must remain equal to c.",
        ],
        difficulty: "standard",
      },
    },
    {
      id: "practice-photon",
      kind: "practice",
      title: "Compare one photon at a time",
      question: {
        id: "light-photon",
        topicId: "11.1-1",
        prompt: "Which photon has more energy: one at 420 nm or one at 680 nm?",
        choices: [
          {
            value: "0",
            label: "The 420 nm photon.",
          },
          {
            value: "1",
            label: "The 680 nm photon.",
          },
          {
            value: "2",
            label: "They have equal energy because their speed is equal.",
          },
        ],
        answer: "0",
        explanation:
          "Shorter wavelength gives higher frequency, and E = hν gives greater energy per photon.",
        hints: [
          {
            text: "First compare their frequencies using ν = c/λ.",
          },
          {
            text: "Then use E = hν: higher frequency means higher photon energy.",
          },
        ],
        misconceptionFeedback: {
          "1": "Longer wavelength means lower frequency and less energy per photon.",
          "2": "Equal speed does not imply equal photon energy. Frequency determines photon energy.",
        },
        workedSolution: [
          "First compare their frequencies using ν = c/λ.",
          "Then use E = hν: higher frequency means higher photon energy.",
          "Shorter wavelength gives higher frequency, and E = hν gives greater energy per photon.",
        ],
        difficulty: "standard",
      },
    },
    {
      id: "practice-amplitude",
      kind: "practice",
      title: "Brightness is a different question",
      question: {
        id: "light-amplitude",
        topicId: "11.1-1",
        prompt:
          "Light keeps the same frequency while its field amplitude increases. What happens to energy per photon?",
        choices: [
          {
            value: "0",
            label: "It increases because the wave is taller.",
          },
          {
            value: "1",
            label: "It decreases.",
          },
          {
            value: "2",
            label: "It stays the same; intensity increases.",
          },
        ],
        answer: "2",
        explanation:
          "At fixed frequency, E = hν stays fixed. Greater amplitude corresponds to greater intensity, with more energy delivered per unit area per second.",
        hints: [
          {
            text: "Ask which quantity appears in E = hν.",
          },
          {
            text: "Changing amplitude changes intensity at a fixed frequency.",
          },
        ],
        misconceptionFeedback: {
          "0": "Field amplitude affects intensity. Energy per photon depends on frequency, not the wave’s height.",
          "1": "The frequency has not changed, so the photon energy has not decreased.",
        },
        workedSolution: [
          "Ask which quantity appears in E = hν.",
          "Changing amplitude changes intensity at a fixed frequency.",
          "At fixed frequency, E = hν stays fixed. Greater amplitude corresponds to greater intensity, with more energy delivered per unit area per second.",
        ],
        difficulty: "standard",
      },
    },
    {
      id: "calculation-example",
      kind: "example",
      title: "Use units to find frequency and energy",
      steps: [
        "Suppose the vacuum wavelength is 600 nm. Predict first: a shorter wavelength would give greater frequency and photon energy.",
        "Convert the distance: 600 nm × (10⁻⁹ m / 1 nm) = 6.00 × 10⁻⁷ m. The nanometer units cancel.",
        "Find frequency: ν = c/λ = (3.00 × 10⁸ m/s) / (6.00 × 10⁻⁷ m) = 5.00 × 10¹⁴ s⁻¹ = 5.00 × 10¹⁴ Hz.",
        "Find one photon’s energy: E = hν = (6.626 × 10⁻³⁴ J·s)(5.00 × 10¹⁴ s⁻¹) = 3.31 × 10⁻¹⁹ J, rounded to three significant figures.",
        "Enter scientific notation with e: 5.00e14 or 3.31e-19. For the following checks, the prompt supplies the unit. Numerical answers within 1% are accepted; these checks do not separately grade significant figures.",
      ],
      continueLabel: "Calculate with guidance →",
    },
    {
      id: "frequency-check",
      kind: "practice",
      title: "Convert before dividing",
      question: {
        id: "light-frequency-number",
        topicId: "11.1-1",
        prompt:
          "Find the frequency in Hz of light with a vacuum wavelength of 500 nm. Use c = 3.00 × 10⁸ m/s. Enter a number only, such as 2.5e14.",
        answer: "6.00e14",
        numericAnswer: {
          value: 600000000000000.0,
          relativeTolerance: 0.01,
        },
        inputPlaceholder: "Frequency in Hz (number only)",
        explanation:
          "500 nm = 5.00 × 10⁻⁷ m. Dividing 3.00 × 10⁸ by 5.00 × 10⁻⁷ gives 6.00 × 10¹⁴ Hz.",
        hints: [
          {
            text: "Convert nm to m by multiplying by 10⁻⁹.",
          },
          {
            text: "Rearrange c = λν to ν = c/λ. Divide by the wavelength in meters.",
          },
        ],
        misconceptionFeedback: {
          "600000":
            "That result comes from dividing by 500 without converting nanometers to meters. Use 500 × 10⁻⁹ m.",
          "6e5":
            "Check the length unit: 500 nm must become 5.00 × 10⁻⁷ m before dividing.",
          "1.5e-7":
            "Frequency is c divided by wavelength, not c multiplied by wavelength.",
        },
        fallbackFeedback:
          "Write 500 nm in meters, then calculate ν = c/λ. When dividing powers of ten, subtract the denominator’s exponent.",
        workedSolution: [
          "500 nm = 5.00 × 10⁻⁷ m.",
          "ν = (3.00 × 10⁸ m/s) / (5.00 × 10⁻⁷ m).",
          "3.00 / 5.00 = 0.600 and 10⁸ / 10⁻⁷ = 10¹⁵. Combine and express in scientific notation.",
          "ν = 6.00 × 10¹⁴ Hz. Enter 6.00e14.",
        ],
        difficulty: "standard",
      },
    },
    {
      id: "energy-check",
      kind: "checkpoint",
      title: "Find energy per photon",
      question: {
        id: "light-energy-number",
        topicId: "11.1-1",
        prompt:
          "A photon has frequency 4.00 × 10¹⁴ Hz. Find its energy in J using h = 6.626 × 10⁻³⁴ J·s. Enter a number only.",
        answer: "2.65e-19",
        numericAnswer: {
          value: 2.6504e-19,
          relativeTolerance: 0.01,
        },
        inputPlaceholder: "Energy in J (number only)",
        explanation:
          "E = hν = (6.626 × 10⁻³⁴)(4.00 × 10¹⁴) J = 2.65 × 10⁻¹⁹ J. The seconds cancel.",
        hints: [
          {
            text: "Use E = hν: multiply Planck’s constant by frequency.",
          },
          {
            text: "Multiply the coefficients and add the exponents: −34 + 14 = −20. Then normalize the coefficient.",
          },
        ],
        misconceptionFeedback: {
          "2.65e19":
            "The exponent should be negative: −34 + 14 = −20 before normalizing the coefficient.",
          "2.6504e-20":
            "The coefficient before normalizing is 26.504, not 2.6504. Moving the decimal left once increases the exponent by 1.",
        },
        fallbackFeedback:
          "Use multiplication, E = hν. Multiply 6.626 by 4.00, add −34 and 14, then express the product with a coefficient between 1 and 10.",
        workedSolution: [
          "Write E = hν.",
          "Multiply coefficients: 6.626 × 4.00 = 26.504.",
          "Add exponents: −34 + 14 = −20; the product is 26.504 × 10⁻²⁰ J.",
          "Normalize and round: 2.65 × 10⁻¹⁹ J. Enter 2.65e-19.",
        ],
        difficulty: "standard",
      },
    },
  ],
};
