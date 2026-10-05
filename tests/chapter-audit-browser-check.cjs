// Run with node --experimental-strip-types to read curriculum metadata directly.
const assert = require("node:assert/strict");
const {
  chromium,
} = require("C:/Users/Brian/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
(async () => {
  const { chapter11, lessons } =
    await import("../src/data/chapters/chapter11.ts");
  const { assessments } = await import("../src/data/assessments.ts");
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  try {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
    });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    for (const topic of chapter11.sections.flatMap((s) => s.topics)) {
      if (topic.lessonId) {
        const lesson = lessons.find((l) => l.id === topic.lessonId);
        assert.equal(lesson.steps[0].kind, "explanation");
        await page.goto(`http://127.0.0.1:5173/lessons/${lesson.id}`);
        await page
          .getByRole("heading", { name: lesson.title, exact: true })
          .waitFor();
        await page.getByRole("button", { name: /I don’t understand/ }).click();
        await page.getByText("Simpler explanation", { exact: true }).waitFor();
        await page
          .getByRole("button", {
            name: lesson.steps[0].continueLabel ?? "Continue →",
            exact: true,
          })
          .click();
        await page.reload();
        await page
          .getByRole("heading", { name: lesson.steps[1].title, exact: true })
          .waitFor();
        const saved = await page.evaluate(() =>
          JSON.parse(localStorage.getItem("orbital.progress.v1")),
        );
        assert.ok(
          saved.topics[topic.id].completedSteps.includes(lesson.steps[0].id),
        );
      } else {
        const a = assessments.find((a) => a.id === topic.assessmentId);
        await page.goto(`http://127.0.0.1:5173/assessments/${a.sectionNumber}`);
        await page.getByRole("button", { name: "Start assessment" }).click();
        const q = a.questions[0];
        await page.locator(`input[value="${q.answer}"]`).check();
        await page.getByRole("button", { name: "Check answer" }).click();
        await page
          .getByRole("button", { name: "Continue →", exact: true })
          .click();
        await page.reload();
        await page
          .getByRole("heading", { name: a.questions[1].concept, exact: true })
          .waitFor();
        const saved = await page.evaluate(() =>
          JSON.parse(localStorage.getItem("orbital.progress.v1")),
        );
        assert.equal(saved.assessments[a.id].results[q.id].completed, true);
      }
    }
    await page.goto("http://127.0.0.1:5173/review/chapter-11");
    const all = page.getByRole("region", { name: "All 15 curriculum topics" });
    assert.equal(await all.getByRole("link").count(), 15);
    assert.equal(
      await all.getByText("Ready to start", { exact: true }).count(),
      0,
    );
    assert.deepEqual(errors, []);
    console.log(
      "PASS: all 11 lessons and four assessments load, accept real progress, and resume from persisted work across all 15 topic IDs; no console errors.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
