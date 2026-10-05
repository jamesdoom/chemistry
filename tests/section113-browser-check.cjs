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
    await page.goto("http://127.0.0.1:5173/");
    const seed = {
      version: 1,
      xp: 80,
      currentTopicId: "11.3-1",
      topics: {
        "11.3-0": { completedSteps: ["hierarchy"], results: {} },
        "11.3-1": { completedSteps: ["interactions"], results: {} },
      },
      assessments: {
        "11.1-3": { results: {} },
        "11.2-3": { results: {} },
        "11.4-assessment": { results: {} },
      },
    };
    await page.evaluate(
      (s) => localStorage.setItem("orbital.progress.v1", JSON.stringify(s)),
      seed,
    );
    await page.reload();
    await page
      .getByRole("region", { name: "Section assessment: 11.3", exact: true })
      .getByRole("link", { name: "Open assessment" })
      .click();
    await page.getByRole("button", { name: "Start assessment" }).click();
    const values = [
      "probability",
      "one",
      "9",
      "max",
      "split",
      "projection",
      "pauli",
      "hund",
      "aufbau",
      "correct",
    ];
    for (const [i, value] of values.entries()) {
      if (i === 0) {
        await page.locator('input[value="path"]').check();
        await page.getByRole("button", { name: "Check answer" }).click();
        await page.getByText(/not a circular electron path/).waitFor();
        assert.equal(
          await page.getByText("Solution:", { exact: false }).count(),
          0,
        );
      }
      if (i === 2) {
        await page.getByLabel("Your answer").fill("18");
        await page.getByRole("button", { name: "Check answer" }).click();
        await page
          .getByText(/Eighteen is the maximum electron capacity/)
          .waitFor();
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
      }
      if (i === 7) {
        await page.locator('input[value="pauli"]').check();
        await page.getByRole("button", { name: "Check answer" }).click();
        await page.getByText(/Opposite spins may share a box/).waitFor();
      }
      if (i === 8) {
        await page.locator('input[value="total"]').check();
        await page.getByRole("button", { name: "Check answer" }).click();
        await page
          .getByText(
            /Correct totals alone do not establish ground-state filling/,
          )
          .waitFor();
      }
      if (i === 2) await page.getByLabel("Your answer").fill(value);
      else {
        await page.locator(`input[value="${value}"]`).focus();
        await page.keyboard.press("Space");
      }
      await page.getByRole("button", { name: "Check answer" }).click();
      await page
        .getByRole("button", { name: "Continue →", exact: true })
        .click();
      if (i === 0) await page.reload();
    }
    await page
      .getByRole("heading", { name: "Your next steps are clearer." })
      .waitFor();
    assert.equal(
      await page
        .getByRole("progressbar", { name: "First-try understanding" })
        .getAttribute("value"),
      "60",
    );
    assert.equal(
      await page.getByRole("link", { name: "Review this concept" }).count(),
      4,
    );
    await page.getByText(/Compare \[↑↓\]/).waitFor();
    await page.screenshot({
      path: "section113-desktop-check.png",
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
      path: "section113-mobile-check.png",
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
    assert.equal(saved.xp, seed.xp);
    for (const id of Object.keys(seed.assessments))
      assert.deepEqual(saved.assessments[id], seed.assessments[id]);
    await page
      .getByRole("link", { name: "Review this concept" })
      .nth(0)
      .click();
    await page.waitForURL("**/lessons/hydrogen-orbitals");
    await page.getByRole("link", { name: "Chapter 11", exact: true }).click();
    await page.getByRole("link", { name: /Section 11.3 Assessment/ }).click();
    await page
      .getByRole("link", { name: "Review this concept" })
      .nth(2)
      .click();
    await page.waitForURL("**/lessons/further-development");
    await page.getByRole("link", { name: "Chapter 11", exact: true }).click();
    await page.getByRole("link", { name: /Section 11.3 Assessment/ }).click();
    await page.getByRole("button", { name: "Retake assessment" }).click();
    saved = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("orbital.progress.v1")),
    );
    assert.deepEqual(saved.assessments["11.3-2"].results, {});
    assert.deepEqual(saved.topics, seed.topics);
    for (const id of Object.keys(seed.assessments))
      assert.deepEqual(saved.assessments[id], seed.assessments[id]);
    assert.deepEqual(errors, []);
    console.log(
      "PASS: model/capacity/filling reasoning, targeted review, progressive hints, keyboard, mobile, resume, isolated retakes, preserved progress and XP, no console errors.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
