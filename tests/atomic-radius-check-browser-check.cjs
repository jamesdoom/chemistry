const assert = require("node:assert/strict");
const {
  chromium,
} = require("C:/Users/Brian/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
(async () => {
  const { focusedLessons } = await import("../src/data/focusedLessons.ts");
  const b = await chromium.launch({ channel: "chrome", headless: true });
  try {
    const p = await b.newPage({ viewport: { width: 390, height: 844 } });
    const errors = [];
    p.on("pageerror", (e) => errors.push(e.message));
    p.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    await p.goto("http://127.0.0.1:5173/learn/atomic-radius");
    // Isolated completed-lesson fixture verifies the path’s final-stage navigation and score isolation.
    const seed = {
      version: 1,
      xp: 50,
      currentTopicId: "atomic-properties",
      topics: {
        "atomic-properties": { completedSteps: ["concept"], results: {} },
        ...Object.fromEntries(
          focusedLessons.map((l) => [
            l.topicId,
            { completedSteps: l.steps.map((s) => s.id), results: {} },
          ]),
        ),
      },
      assessments: { "11.4-assessment": { results: {} } },
    };
    await p.evaluate(
      (s) => localStorage.setItem("orbital.progress.v1", JSON.stringify(s)),
      seed,
    );
    await p.reload();
    await p
      .getByRole("link", { name: "Check your understanding", exact: false })
      .click();
    await p.getByRole("button", { name: "Start assessment" }).click();
    for (const [i, value] of [
      "na",
      "level",
      "counts",
      "correct",
      "level",
      "consistent",
    ].entries()) {
      if (i === 0) {
        await p.locator('input[value="mg"]').check();
        await p.getByRole("button", { name: "Check answer" }).click();
        await p.getByText(/Added outer electrons do not shield/).waitFor();
      }
      if (i === 3) {
        await p.locator('input[value="swapped"]').check();
        await p.getByRole("button", { name: "Check answer" }).click();
        await p.getByText(/coordinates are reversed/).waitFor();
        await p.getByRole("button", { name: "Hint 1", exact: true }).click();
        await p.reload();
        for (const name of ["Hint 2", "Walk me through it", "Show solution"])
          await p.getByRole("button", { name, exact: true }).click();
      }
      await p.locator(`input[value="${value}"]`).check();
      await p.getByRole("button", { name: "Check answer" }).click();
      await p.getByRole("button", { name: "Continue →", exact: true }).click();
      if (i === 0) await p.reload();
    }
    await p
      .getByRole("heading", { name: "Your next steps are clearer." })
      .waitFor();
    assert.equal(
      await p
        .getByRole("progressbar", { name: "First-try understanding" })
        .getAttribute("value"),
      "67",
    );
    await p
      .getByRole("link", { name: "Open your atomic-radius review paths" })
      .click();
    await p.reload();
    const reviews = p.getByRole("region", {
      name: "Atomic-radius review recommendations",
    });
    assert.equal(
      await reviews.getByRole("link", { name: "Review this concept" }).count(),
      2,
    );
    await p
      .getByRole("link", { name: "View your understanding report" })
      .waitFor();
    let saved = await p.evaluate(() =>
      JSON.parse(localStorage.getItem("orbital.progress.v1")),
    );
    assert.deepEqual(saved.topics, seed.topics);
    assert.deepEqual(
      saved.assessments["11.4-assessment"],
      seed.assessments["11.4-assessment"],
    );
    assert.equal(saved.xp, 50);
    for (const width of [320, 390, 768, 1440]) {
      await p.setViewportSize({ width, height: 1000 });
      assert.ok(
        await p.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      );
    }
    await p
      .getByRole("link", { name: "View your understanding report" })
      .click();
    await p.getByRole("button", { name: "Retake assessment" }).click();
    saved = await p.evaluate(() =>
      JSON.parse(localStorage.getItem("orbital.progress.v1")),
    );
    assert.deepEqual(saved.assessments["atomic-radius-check"].results, {});
    assert.deepEqual(saved.topics, seed.topics);
    assert.deepEqual(errors, []);
    console.log(
      "PASS: final-stage path navigation, check, feedback, hints, saved report/resume, weak-topic review paths, isolated retake, preserved chapter/lesson evidence and XP, responsive layout.",
    );
  } finally {
    await b.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
