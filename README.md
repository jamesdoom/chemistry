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

The topic now has 21 practice items: 3 lesson questions and 18 orbital diagrams. Introducing these new items can lower previously displayed percentages; existing successful results and XP are preserved. Only questions in the active registries count. Each newly solved question awards 10 XP once.

States: NOT_STARTED (no activity), LEARNING (steps completed), PRACTICING (attempts/evidence), MASTERED (80% or higher). Completing a supported lesson and mastering a topic are separate outcomes.

Chapter mastery averages all 15 listed topics; topics without practice count as zero. The available lesson progress meter measures only the six implemented lesson steps. Unavailable sections are never marked complete. Chapter mastery can currently reach only 7% because the other topics are unavailable.

## Orbital filling practice

Open `/practice/orbitals` from the dashboard or lesson completion screen. Each electron slot cycles empty → ↑ → ↓ → empty with mouse, touch, Enter, or Space. Live electron counts and configuration notation reflect the student's own diagram.

The checker diagnoses wrong electron totals, skipped lower-energy sublevels, same-spin pairs/overcapacity, premature p-orbital pairing, and nonparallel unpaired p spins. It accepts equivalent choices of p boxes and parallel unpaired spins pointing either up or down. Feedback highlights the first issue to address; other issues are in an expandable list.

Help progresses through Hint 1 → Hint 2 → walkthrough → solution. Solutions never automatically fill the student's diagram. Clear diagram retains the current attempt's help status. After success, Practice again without hints starts a fresh diagram that can improve evidence without adding XP.

Results and completed activities persist with the existing localStorage schema. Draft diagrams, draft text answers, and visible hints are session state; switching atoms or refreshing clears them. Reconstructing a fresh diagram can count as independent evidence, consistent with the deliberately simple mastery model.

## Add another lesson

1. Add a Topic with stable `id` and `lessonId` to a section.
2. Create a Lesson with matching ID, topicId, subtitle, and typed steps.
3. Add it to the lesson registry. Practice steps contain prompt, answer, explanation, hints, misconceptionFeedback, workedSolution, difficulty, and topicId.
4. Reuse the existing LessonPage renderer. Explanation steps can store progressively simpler explanation levels.
5. Question counts update automatically from the registered content. Adding new step kinds requires a typed renderer branch.

## Verification

`npm run test` checks mastery, saved data, corrupted/blocked storage, all 18 ground-state solutions, spin reversal, p-box permutations, individual rule errors, and multiple simultaneous mistakes.

With Vite running on 127.0.0.1:5173:

```sh
node tests/browser-check.cjs
node tests/orbital-browser-check.cjs
```

The first script verifies the original lesson flow and persistence. The second verifies orbital diagnostics, valid alternatives, keyboard controls, progressive hints, supported/independent mastery, atom changes, XP deduplication, refresh, and responsive widths of 768, 390, and 320 pixels. Both capture console/page errors and use isolated temporary browser contexts.

Browser scripts use the bundled Playwright runtime on this machine. Elsewhere, set PLAYWRIGHT_MODULE to an installed Playwright module path; Chrome must be available.

## Intentional scope

One Section 11.4 lesson and the orbital exercise set are functional. Sections 11.1–11.3 and the remaining 11.4 topics are navigation metadata. Orbital exercises support neutral ground-state atoms H–Ar; ions, excited states, and heavier atoms are outside scope. No drag-and-drop, adaptive algorithm, streaks, achievements, AI, authentication, or backend. BrowserRouter hosting requires a fallback to index.html for deep links.

The best next step is to connect orbital diagrams to valence electrons and periodic-table groups through a short interactive follow-up lesson.
