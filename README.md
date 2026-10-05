# Orbital — chemistry, connected

A React + strict TypeScript + Vite chemistry learning tool. Chapter and section titles align with World of Chemistry, 4th Edition; explanations, questions, feedback, and diagrams are original.

## Run locally

Requires Node 22.18+ for the native TypeScript test runner.

```sh
npm install
npm run dev
npm run typecheck
npm run test
npm run build
```

On this machine the default npm launcher is broken. Use this equivalent PowerShell invocation if needed:

```powershell
& 'C:\Program Files\nodejs\node.exe' 'C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js' run dev
```

## Structure

- `src/types/`: curriculum, orbital exercise, and student progress models. Lesson steps use a discriminated union.
- `src/data/chapters/chapter11.ts`: Chapter → Section → Topic navigation metadata and a Lesson registry. Topics refer to lessons by stable IDs.
- `src/data/chapters/periodicLesson.ts`: valence-electron/periodic-table lesson with configurable visuals and six questions.
- `src/data/chapters/trendsLesson.ts` and `src/data/atomicTrends.ts`: atomic-property lesson, qualitative comparisons, ionization exceptions, and seven questions.
- `src/data/periodicTable.ts` and `src/utils/atomicProperties.ts`: first-18 table metadata and derived periods, main-group columns, and valence counts.
- `src/data/practice/orbitals.ts`: neutral-atom exercises (H–Ar), sublevel definitions, and rule guides.
- `src/components/`: learning visuals, lesson practice, interactive orbital board, progressive help, and progress meters.
- `src/pages/`: dashboard, chapter roadmap, sequential lesson, and orbital practice page.
- `src/context/ProgressContext.tsx`: immutable progress updates, XP, and persistence orchestration.
- `src/utils/storage.ts`: versioned, validated localStorage reads and guarded writes.
- `src/utils/mastery.ts`: replaceable practice-evidence calculation.
- `src/utils/learning.ts`: active question IDs and topic mastery derived from content registries.
- `src/utils/orbitals.ts`: pure electron-count, Aufbau, Pauli, and Hund evaluation, plus a solution generator for neutral ground-state atoms 1–18.
- `tests/`: domain tests and browser verification flows.

## Progress and mastery

Progress is stored on this browser/device under `orbital.progress.v1`. It records completed step IDs, question attempts, successful/independent results, help use, current topic, and XP. Invalid or unsupported stored data falls back to an empty record. Storage failures show a notice. No account, sync, or backend is required.

Topic mastery = earned evidence / total active practice questions, rounded to a percentage. Correct without hints earns 1; correct with hints earns 0.5; unanswered/incorrect earns 0. A fresh correct review without hints can improve evidence. Incorrect attempts without hints do not reduce the eventual independent score. The best evidence is retained. This is an MVP indicator, not a validated measure of long-term mastery.

Electron arrangements has 21 practice items: 3 lesson questions and 18 orbital diagrams. Electron Configurations and the Periodic Table has six questions, and Atomic Properties has seven. Each topic has separate mastery. Introducing these new items can lower previously displayed percentages; existing successful results and XP are preserved. Only questions in the active registries count. Each newly solved question awards 10 XP once.

States: NOT_STARTED (no activity), LEARNING (steps completed), PRACTICING (attempts/evidence), MASTERED (80% or higher). Completing a supported lesson and mastering a topic are separate outcomes.

Chapter mastery averages all 15 listed topics; topics without practice count as zero. The available lesson progress meter measures the 29 steps across all three implemented lessons. Each lesson also has its own completion indicator. Continue Learning resumes an unfinished current lesson or recommends the next available lesson. Unavailable sections are never marked complete. Chapter mastery can currently reach only 20% because the other topics are unavailable.

## Orbital filling practice

Open `/practice/orbitals` from the dashboard or lesson completion screen. Each electron slot cycles empty → ↑ → ↓ → empty with mouse, touch, Enter, or Space. Live electron counts and configuration notation reflect the student's own diagram.

The checker diagnoses wrong electron totals, skipped lower-energy sublevels, same-spin pairs/overcapacity, premature p-orbital pairing, and nonparallel unpaired p spins. It accepts equivalent choices of p boxes and parallel unpaired spins pointing either up or down. Feedback highlights the first issue to address; other issues are in an expandable list.

Help progresses through Hint 1 → Hint 2 → walkthrough → solution. Solutions never automatically fill the student's diagram. Clear diagram retains the current attempt's help status. After success, Practice again without hints starts a fresh diagram that can improve evidence without adding XP.

Results and completed activities persist with the existing localStorage schema. Draft diagrams, draft text answers, and visible hints are session state; switching atoms or refreshing clears them. Reconstructing a fresh diagram can count as independent evidence, consistent with the deliberately simple mastery model.

## Add another lesson

1. Add a Topic with stable `id` and `lessonId` to a section.
2. Create a Lesson with matching ID, topicId, subtitle, summary, optional completionActions, and typed steps.
3. Add it to the lesson registry. Practice steps contain prompt, answer, explanation, hints, misconceptionFeedback, workedSolution, difficulty, and topicId, with optional radio choices and input/fallback text.
4. Reuse the existing LessonPage renderer. Explanation steps store progressively simpler explanation levels and optional concept chains. Visual and example steps choose a typed illustration; periodic-table steps provide exploration targets. Continue-button labels and fallback question feedback are content data.
5. Question counts update automatically from the registered content. Adding new step kinds requires a typed renderer branch.

## Verification

`npm run test` checks mastery, saved data, corrupted/blocked storage, all 18 ground-state solutions, spin reversal, p-box permutations, individual rule errors, and multiple simultaneous mistakes.

With Vite running on 127.0.0.1:5173:

```sh
node tests/browser-check.cjs
node tests/orbital-browser-check.cjs
node tests/periodic-browser-check.cjs
node tests/trends-browser-check.cjs
```

The first script verifies the original lesson flow and persistence. The second verifies orbital diagnostics, valid alternatives, keyboard controls, progressive hints, supported/independent mastery, atom changes, XP deduplication, refresh, and responsive widths of 768, 390, and 320 pixels. The third checks the new lesson, helium’s exception, table exploration, targeted feedback, independent topic progress, saved earlier results, and mid-lesson resume. The fourth checks the atomic-property lesson, qualitative diagrams, ionization process, comparison exploration, radio questions, complete help path, mastery, and resume. All four capture console/page errors and use isolated temporary browser contexts.

Browser scripts use the bundled Playwright runtime on this machine. Elsewhere, set PLAYWRIGHT_MODULE to an installed Playwright module path; Chrome must be available.

## Intentional scope

Three Section 11.4 lessons and the orbital exercise set are functional. Sections 11.1–11.3 and the Section 11.4 Assessment remain navigation metadata. Orbital exercises support neutral ground-state atoms H–Ar; ions, excited states, and heavier atoms are outside scope. No drag-and-drop, adaptive algorithm, streaks, achievements, AI, authentication, or backend. BrowserRouter hosting requires a fallback to index.html for deep links.

The best next step is the mixed Section 11.4 Assessment. See [the Chapter 11 completion plan](docs/chapter-11-roadmap.md) for the ordered remaining updates.

## Valence electrons and periodic-table lesson

Open `/lessons/periodic-table` from the chapter page, dashboard, or first lesson’s completion screen. The lesson follows concept → labeled outer-electron visual → stepped oxygen example → interactive first-18 table → guided nitrogen/oxygen/neon practice → three magnesium mastery checks. Modern groups 1, 2, and 13–18 are shown in their relative order; groups 3–12 are explicitly omitted. Students explore nitrogen, oxygen, and neon before continuing. Helium is explained as the two-valence-electron exception in group 18. The rules are limited to neutral ground-state H–Ar, not transition metals.

Completed steps, question results, and XP persist using the existing schema. The new topic does not change the original topic’s mastery denominator or remove earlier records. Exploration selections are temporary; an unfinished exploration restarts on refresh, while completed steps and answered practice resume as before. Overall lesson progress may drop when new lesson steps become available; this does not erase previous completion.

## Atomic size and first ionization energy

Open `/lessons/atomic-trends` from the dashboard, chapter roadmap, or periodic-table lesson completion screen. The original lesson connects occupied levels, shielding, and nuclear attraction to atomic size and first ionization energy. It contains two worked examples, qualitative cloud sketches, outer-orbital diagrams, six explorable comparisons, four guided questions, and three mastery checks. It explains first ionization as an energy input for a neutral isolated gaseous atom and explicitly includes the Be/B and N/O exceptions. Practice transfers the sublevel exception to Mg/Al.

Cloud sketches have no measured radii or physical scale; they show qualitative comparisons and have diffuse edges rather than orbital paths. Removal equations are neutral atom + energy → singly positive ion + electron. The comparison explorer requires five views, including N/O, before continuing; Be/B is additionally available. Exploration choices and open equations are temporary; scored results and completed steps persist. The seven new results use the existing localStorage schema under the separate atomic-properties topic. Earlier topic denominators and records remain unchanged. Adding the third lesson increases available lesson steps, so aggregate completion percentages can decrease without losing prior work.

Scientific trend/exception facts were checked against [OpenStax Chemistry 2e, Periodic Variations in Element Properties](https://openstax.org/books/chemistry-2e/pages/6-5-periodic-variations-in-element-properties). No source prose, questions, or diagrams were copied. The lesson intentionally covers atomic size and first ionization energy, not a numerical radius database, electron affinity, or all ionic-size/metallic-property details. Those can be scoped during the Chapter 11 content audit if the course requires them.

### Section 11.4 assessment

Open `/assessments/11.4` from the dashboard, chapter page, or atomic-trends completion. Ten original mixed questions diagnose counts, notation, filling rules, valence/location, size, and ionization. The latest attempt lives in the optional `assessments` map of `orbital.progress.v1`; existing version-1 lesson data remains valid. Each result saves attempts, first-try success without help, support use, correct answer state, and completion. Refresh resumes the current question or report. Retake replaces only this assessment report. Assessment answers do not change lesson mastery or award XP. The report shows first-try evidence, not a claim of long-term mastery; retries/support produce specific review links.

### Rutherford’s Atom

`/lessons/rutherford` adds original evidence-to-inference teaching, three qualitative scattering paths, a worked example, and five guided/checkpoint questions. The activity distinguishes observations from inferred structure, explains electrical repulsion without requiring contact, and states the limits of the nuclear model. Drawings are illustrative, not measured simulations or to-scale atoms. Science checked against [OpenStax: Evolution of Atomic Theory](https://openstax.org/books/chemistry-atoms-first-2e/pages/2-2-evolution-of-atomic-theory); no source prose or diagrams copied. Topic ID `11.1-0` remains stable. Completion and mastery use existing local progress; individual explorer selections reset until the activity step is completed. Lesson order keeps Section 11.4 first for the student’s current course focus, then continues to Rutherford.
