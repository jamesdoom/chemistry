# Chapter 11 supplemental-content audit

Audit date: 2026-10-05. All 15 listed course entries have functional original supplemental lessons or assessments. This verifies the implemented scope, not every detail of the textbook or a claim that the student has completed the content.

## Coverage and persistence

| Section | Course topic | Functional route | Saved identity |
| --- | --- | --- | --- |
| 11.1 | Rutherford’s Atom | `/lessons/rutherford` | `topics[11.1-0]` |
| 11.1 | Energy and Light | `/lessons/energy-light` | `topics[11.1-1]` |
| 11.1 | Emission of Energy by Atoms | `/lessons/atomic-emission` | `topics[11.1-2]` |
| 11.1 | Section 11.1 Assessment | `/assessments/11.1` | `assessments[11.1-3]` |
| 11.2 | The Energy Levels of Hydrogen | `/lessons/hydrogen-levels` | `topics[11.2-0]` |
| 11.2 | The Bohr Model of the Atom | `/lessons/bohr-model` | `topics[11.2-1]` |
| 11.2 | The Wave Mechanical Model of the Atom | `/lessons/wave-mechanical` | `topics[11.2-2]` |
| 11.2 | Section 11.2 Assessment | `/assessments/11.2` | `assessments[11.2-3]` |
| 11.3 | The Hydrogen Orbitals | `/lessons/hydrogen-orbitals` | `topics[11.3-0]` |
| 11.3 | The Wave Mechanical Model: Further Development | `/lessons/further-development` | `topics[11.3-1]` |
| 11.3 | Section 11.3 Assessment | `/assessments/11.3` | `assessments[11.3-2]` |
| 11.4 | Electron Arrangements in the First 18 Atoms on the Periodic Table | `/lessons/first-18` and `/practice/orbitals` | `topics[electron-arrangements]` |
| 11.4 | Electron Configurations and the Periodic Table | `/lessons/periodic-table` | `topics[configurations-periodic-table]` |
| 11.4 | Atomic Properties and the Periodic Table | `/lessons/atomic-trends` | `topics[atomic-properties]` |
| 11.4 | Section 11.4 Assessment | `/assessments/11.4` | `assessments[11.4-assessment]` |

The 11 lessons contain 91 authored steps. Every lesson has progressive alternative explanations, a visual or interactive activity, a stepped worked example, and practice with hints, explanations, and misconception feedback. All four section assessments have authored questions, worked solutions, and targeted review recommendations. Curriculum titles align the supplemental content; lesson prose, questions, SVG diagrams, and activities are original rather than reproduced textbook material.

The added `/review/chapter-11` connects scattering → atomic structure → light and energy changes → hydrogen/model limits → orbitals → filling → configurations → periodic properties. Its 12-question mixed check at `/assessments/chapter-11` links back to every learning topic. It is extra review, not a sixteenth curriculum entry. Its evidence lives in `assessments[chapter-11-review]`.

## Progress and review rules

Everything persists in the existing `orbital.progress.v1` localStorage record. Existing stable topic, step, question, and assessment IDs remain intact; no schema migration, sign-in, backend, or external runtime service was added. Lessons save completed steps and practice results. Assessments save attempts, first-try evidence, help use, correctness, and completion. Refresh resumes the next unfinished step/question or a completed assessment report. Retaking replaces only the chosen assessment report and does not alter other reports, accumulated lesson evidence, or XP.

Chapter lesson mastery is now the average of the **11 lesson** mastery scores, including unstarted lessons as zero. Previously the dashboard also divided by four assessment entries that have no lesson questions, incorrectly capping mastery below 100%. Assessment first-try understanding remains a separate measure. Curriculum completion counts completed lessons and completed section assessments across all 15 entries. Finishing lesson steps does not manufacture mastery, and no topics are marked complete by default.

Review recommendations use transparent rules in `src/utils/chapterReview.ts`: lesson evidence below 80% after an authored practice attempt, or a retry/help request in the latest assessment, suggests a review route. A lesson can still be recommended by assessment evidence even when its accumulated lesson mastery is high. Unattempted lessons and retired question results do not diagnose weakness. Recommendations merge by lesson route, retaining the specific reasons. A retake replaces the relevant latest report, so outdated report recommendations disappear. This is a simple review aid, not an adaptive algorithm or proof of long-term retention.

## Verification evidence

- Strict TypeScript and production build pass.
- 39 domain tests pass, including 15-entry content coverage, authoring integrity, score/report separation, all-entry storage roundtrip, 100% mastery reachability, and review recommendation isolation.
- All 15 existing browser regression scripts pass. Together they exercise every lesson, the four section assessments, orbital filling, progressive help, feedback, navigation, keyboard use, mobile layouts, local progress, and assessment retake isolation.
- The new chapter-review browser check passes the 12-question flow, energy-gap calculation, weak paths, hints, report, refresh, and isolated retake. Desktop, tablet, 390px, and 320px layouts were checked; browser errors were collected and none occurred.
- The new chapter-audit browser check performs real UI actions for each of the 11 lessons and four section assessments in an isolated browser, then refreshes to verify the next step/question resumes under the correct saved identity. This supplements the full per-topic flow regressions rather than relying only on seeded completion.
- Desktop/mobile screenshots were inspected. Test browsers use isolated localStorage and do not overwrite the student’s browser progress. Complete-progress fixtures exist only inside tests.

## Scientific and intentional boundaries

- Scattering and energy diagrams are qualitative; arbitrary illustration spacing is not measured experimental data.
- Probability drawings describe distributions, not trajectories, many electrons in one hydrogen atom, or hard boundaries. Bohr circles are explicitly historical assumptions.
- The basic isolated-hydrogen model omits fine details; orbitals sharing n have equal energy in that model. Multi-electron sublevels differ because interactions, penetration, and shielding matter. p orientations are not an x/y/z energy ladder without an applied field.
- s/p shapes and orientations are taught explicitly. d/f orbital counts and capacities are covered; detailed d/f surfaces and higher-state radial nodes are outside this slice.
- Spin arrows represent projections, not travel direction or literal rotation. Pauli, Hund, and Aufbau diagnoses are separated.
- Configuration practice remains neutral ground-state H–Ar. No verified course requirement was supplied for heavier-element exceptions, ions, or transition-metal configurations. Capacities do not imply a universal cross-level filling order.
- Trends include sublevel/pairing exceptions; trend arrows alone are not explanations.
- LocalStorage is specific to the browser/device. No cross-device sync or export is implemented. Chapter review remains a short supplemental check, not a final course examination.
- Vite reports advisory React Router directive warnings and a main bundle above 500 kB (about 150 kB gzip). Compilation succeeds; route/content splitting is a possible later performance refinement.

Best next step: use the completed Chapter 11 flow with the student and collect the specific explanations and review paths that still leave them stuck before expanding the course.
