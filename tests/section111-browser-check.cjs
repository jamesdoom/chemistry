const assert = require("node:assert/strict");
const {
  chromium,
} = require("C:/Users/Brian/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
(async () => {
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
    await page.goto("http://127.0.0.1:5173");
    const seed = {
      version: 1,
      xp: 30,
      currentTopicId: "11.1-2",
      topics: { "11.1-2": { completedSteps: ["concept"], results: {} } },
      assessments: {
        "11.4-assessment": {
          results: {
            "assessment-neutral-count": {
              attempts: 1,
              firstCorrect: true,
              correct: true,
              helpUsed: false,
              completed: true,
            },
          },
        },
      },
    };
    await page.evaluate(
      (seed) =>
        localStorage.setItem("orbital.progress.v1", JSON.stringify(seed)),
      seed,
    );
    await page.reload();
    await page
      .getByRole("region", { name: "Section assessment: 11.1", exact: true })
      .getByRole("link", { name: "Open assessment" })
      .click();
    await page.waitForURL("**/assessments/11.1");
    await page.getByRole("button", { name: "Start assessment" }).click();
    await page.locator('input[type="radio"][value="0"]').check();
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.getByText(/inferred model used to explain/).waitFor();
    assert.equal(
      await page.getByText("Solution:", { exact: false }).count(),
      0,
    );
    await page.locator('input[type="radio"][value="1"]').check();
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.reload();
    await page.getByText(/Saved correct answer/).waitFor();
    await page.getByRole("button", { name: "Continue →", exact: true }).click();
    for (const value of ["2", "0", "1"]) {
      await page.locator(`input[type="radio"][value="${value}"]`).check();
      await page.getByRole("button", { name: "Check answer" }).click();
      await page
        .getByRole("button", { name: "Continue →", exact: true })
        .click();
    }
    await page.getByLabel("Your answer").fill("1e6");
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.getByText(/without converting 300 nm/).waitFor();
    await page.getByRole("button", { name: "Hint 1", exact: true }).click();
    await page.reload();
    await page.getByRole("button", { name: "Hint 2", exact: true }).click();
    await page
      .getByRole("button", { name: "Walk me through it", exact: true })
      .click();
    assert.equal(
      await page.getByText("Solution:", { exact: false }).count(),
      0,
    );
    await page
      .getByRole("button", { name: "Show solution", exact: true })
      .click();
    await page.getByLabel("Your answer").fill("1e15");
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.getByRole("button", { name: "Continue →", exact: true }).click();
    await page.getByLabel("Your answer").fill("1.99e-19");
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.getByRole("button", { name: "Continue →", exact: true }).click();
    await page.locator('input[type="radio"][value="1"]').check();
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.getByRole("button", { name: "Continue →", exact: true }).click();
    await page.getByLabel("Your answer").fill("5e-19");
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.getByRole("button", { name: "Continue →", exact: true }).click();
    for (const value of ["2", "0"]) {
      await page.locator(`input[type="radio"][value="${value}"]`).focus();
      await page.keyboard.press("Space");
      await page.getByRole("button", { name: "Check answer" }).click();
      await page
        .getByRole("button", { name: "Continue →", exact: true })
        .click();
    }
    await page
      .getByRole("heading", { name: "Your next steps are clearer." })
      .waitFor();
    assert.equal(
      await page
        .getByRole("progressbar", { name: "First-try understanding" })
        .getAttribute("value"),
      "80",
    );
    assert.equal(
      await page.getByRole("link", { name: "Review this concept" }).count(),
      2,
    );
    await page.getByText(/Convert nanometers to meters first/).waitFor();
    await page.screenshot({
      path: "section111-desktop-check.png",
      fullPage: true,
    });
    for (const width of [768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      );
    }
    await page.screenshot({
      path: "section111-mobile-check.png",
      fullPage: true,
    });
    await page.reload();
    await page
      .getByRole("heading", { name: "Your next steps are clearer." })
      .waitFor();
    let saved = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("orbital.progress.v1")),
    );
    assert.deepEqual(saved.topics, seed.topics);
    assert.deepEqual(
      saved.assessments["11.4-assessment"],
      seed.assessments["11.4-assessment"],
    );
    assert.equal(saved.xp, 30);
    await page
      .getByRole("link", { name: "Review this concept" })
      .last()
      .click();
    await page.waitForURL("**/lessons/energy-light");
    await page.getByRole("link", { name: "Chapter 11", exact: true }).click();
    await page
      .getByRole("link", { name: "Section 11.4 Assessment", exact: false })
      .click();
    await page.waitForURL("**/assessments/11.4");
    await page
      .getByRole("heading", { name: "Configuration notation", exact: true })
      .waitFor();
    await page.getByRole("link", { name: "Chapter 11", exact: true }).click();
    await page
      .getByRole("link", { name: "Section 11.1 Assessment", exact: false })
      .click();
    await page.getByRole("button", { name: "Retake assessment" }).click();
    saved = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("orbital.progress.v1")),
    );
    assert.deepEqual(saved.assessments["11.1-3"].results, {});
    assert.deepEqual(
      saved.assessments["11.4-assessment"],
      seed.assessments["11.4-assessment"],
    );
    assert.deepEqual(saved.topics, seed.topics);
    await page.goto("http://127.0.0.1:5173/assessments/99");
    await page
      .getByRole("heading", { name: "Assessment not available" })
      .waitFor();
    assert.deepEqual(errors, []);
    console.log(
      "PASS: Section 11.1 concepts/calculations, targeted recommendations, hints, keyboard, report/resume, responsive layout, review links, isolated retake, cross-assessment navigation, no console errors.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
