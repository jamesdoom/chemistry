# Chapter 11 completion plan

## Current checkpoint

Three Section 11.4 learning topics are functional:

- Electron Arrangements in the First 18 Atoms: concept-to-configuration lesson and H–Ar orbital-filling practice.
- Electron Configurations and the Periodic Table: valence electrons, groups/periods, a first-18 table, and helium's exception.
- Atomic Properties and the Periodic Table: size, shielding, nuclear attraction, first ionization energy, and sublevel/pairing exceptions.

Section 11.4 Assessment is functional: ten mixed checks, a saved latest-attempt report, and concept-specific review links. Assessment evidence is saved separately from lesson scores. Rutherford’s Atom in Section 11.1 is now functional, with a qualitative scattering explorer. Energy and Light is also functional, including a wave/amplitude explorer and numerical practice. Emission of Energy by Atoms is also functional, with an illustrative level/spectrum explorer and energy-gap practice. Section 11.1 Assessment is functional, with conceptual questions, three calculations, and targeted review recommendations. The Energy Levels of Hydrogen and The Bohr Model of the Atom are functional as two short linked lessons. The Wave Mechanical Model of the Atom is functional, with probability clouds, independent outcome samples, and orbit/path misconceptions. Section 11.2 Assessment and Section 11.3 remain navigation metadata, not completed lessons. The plan completes the listed course topics with original supplemental teaching; it does not reproduce every detail of the textbook.

## Rules for each update

Deliver one short lesson or assessment at a time. Use original concept → visual → worked example → guided practice → independent check content, with simpler explanations, progressive hints, and misconception feedback. Keep completion and mastery separate; retain stable topic/question IDs and earlier results. Save locally, with no sign-in, backend, external runtime API, or AI. Check scientific accuracy, TypeScript/build, keyboard/mobile use, navigation, refresh persistence, and affected existing flows before pushing. Section labels and dashboard continuation now derive from curriculum metadata.

## Ordered milestones

### 1. Finish Section 11.4 Assessment � completed

Add an original mixed check covering neutral electron counts, configurations, Aufbau/Pauli/Hund, valence electrons, group/period, atomic size, and first ionization energy. Ask for explanations as well as predictions, using transfer examples instead of repeated worked examples. Provide strengths, weak-concept feedback, and links to the three existing lessons. Store assessment evidence under its own assessment ID without overwriting learning-topic scores. Extend notation or elements only where course expectations require it; do not silently apply H–Ar rules to transition metals.

Done when: the assessment is navigable and persisted, feedback points to specific concepts, and existing progress is preserved.

### 2. Section 11.1 — Rutherford's Atom — completed

Add an original qualitative scattering activity: most positive alpha particles pass through, some deflect, and very few turn back. Connect observations to mostly empty space and a small, dense, positive nucleus. Separate observations from inferred structure. Explain that this model alone does not account for stable electron arrangements or atomic spectra. Label the activity as qualitative rather than a precise physics simulation.

Done when: students explain each observation without confusing the nucleus with an electron cloud.

### 3. Section 11.1 — Energy and Light — completed

Use an adjustable wave visual to teach wavelength, frequency, and photon energy. Distinguish amplitude from frequency and energy per photon. For light in the same medium, longer wavelength means lower frequency; higher frequency means higher photon energy. Begin with qualitative comparisons, then supported calculations using c = λν and E = hν. Add unit/scientific-notation handling and numerical tolerance behind grading utilities only when those calculations need it.

Done when: students predict the relationships before calculating and receive targeted feedback about units or reversed relationships.

### 4. Section 11.1 — Emission of Energy by Atoms — completed

Add original energy-level and spectral-line visuals showing absorption versus emission. A downward transition can emit a photon matching the energy difference. Contrast line spectra with continuous light. Label illustrative gaps; cite any measured wavelengths rather than inventing data.

Done when: students connect energy entering/leaving an atom to transitions and photon energies.

### 5. Section 11.1 Assessment — completed

Build a separate short mixed assessment on Rutherford's evidence, light relationships, and emission, including a supported calculation and targeted review links. Preserve topic-level mastery and separate assessment evidence.

Done when: completion does not falsely mark every concept mastered, and review recommendations are actionable.

### 6. Section 11.2 — Hydrogen Energy Levels and the Bohr Model — completed

Implement these as two short linked lessons, one update at a time. Cover allowed levels, ground/excited states, transitions, ionization, and hydrogen's line spectrum. Use a constrained transition selector. Explain the limits of Bohr's circular-path picture and its one-electron treatment. Do not draw hydrogen levels as equally spaced. Add energy arithmetic only after qualitative reasoning works.

Done when: students compare energy gaps and predict absorption/emission without assuming all atoms have Bohr-style electron tracks.

### 7. Section 11.2 — Wave Mechanical Model, then Assessment

First add a probability-cloud lesson distinguishing an orbital from a circular path or fixed particle trajectory. Compare what Rutherford, Bohr, and the wave mechanical model explain. Use original probability visualizations and concrete misconception checks.

In the following update, add Section 11.2 Assessment combining levels, model limitations, and probability reasoning.

Done when: students explain what an orbital represents and choose a useful model for a question; assessment results persist separately.

### 8. Section 11.3 — Hydrogen Orbitals

Teach level → sublevel → orbital with labeled s/p visuals and allowed orbital counts. Show different p orientations and their equal energies in an isolated hydrogen atom. Boundary drawings enclose a chosen probability region, not a hard surface or electron path. Introduce nodes in an optional deeper explanation if needed for course alignment. Connect identification/counting practice to the existing orbital boxes.

Done when: students distinguish levels, sublevels, orbitals, and occupying electrons.

### 9. Section 11.3 — Further Development of the Wave Mechanical Model

Explain multi-electron atoms, shielding/sublevel energies, spin, capacity, and filling rules with links to Section 11.4. Introduce s/p/d/f orbital counts and capacities. Extend filling order or configuration notation beyond the first 18 only as a clearly scoped activity with appropriate validation; retain the current H–Ar exercise's limits.

Done when: students explain why the filling rules describe different constraints and why multi-electron atoms differ from hydrogen.

### 10. Section 11.3 Assessment

Combine model interpretation, shapes/orientations, counts/capacities, spin, and filling-rule reasoning. Use misconception diagrams and links back to the appropriate lessons.

Done when: the assessment is independently persisted and scientifically consistent with both hydrogen and multi-electron explanations.

### 11. Whole-chapter review and final audit

Add a mixed review connecting light → energy changes → models → orbitals → configurations → periodic properties. Use the transparent mastery calculation for review suggestions, not a new adaptive algorithm. Keep all four section assessments and learning topics visible separately.

Audit all 15 listed topics for functional content, original explanations, appropriate visuals/worked examples, progressive help, feedback, and mastery evidence. Check every route, mobile/keyboard flow, and saved progress. Give students a concept map and a concrete next-review action.

Done when: all 15 listed Chapter 11 topics have functional lessons/assessments, none rely on fabricated completion, and the full regression suite passes.

## Implementation order

Milestone 1 is complete. Milestone 2 is complete. Milestone 3 is complete. Milestone 4 is complete. Milestone 5 is complete. Milestone 6 is complete. The lesson portion of milestone 7 is complete. Next, add Section 11.2 Assessment as a separate update. Then continue through 11.1, 11.2, and 11.3 in order. Milestones containing multiple lessons or an assessment deliberately span separate updates. Revisit scope after each milestone using actual student misconceptions and course expectations, keeping optional content distinct from required mastery evidence.
