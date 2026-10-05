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
      xp: 80,
      currentTopicId: "11.2-2",
      topics: { "11.2-2": { completedSteps: ["concept"], results: {} } },
      assessments: {
        "11.1-3": { results: {} },
        "11.4-assessment": { results: {} },
      },
    };
    await page.evaluate(
      (seed) =>
        localStorage.setItem("orbital.progress.v1", JSON.stringify(seed)),
      seed,
    );
    await page.reload();
    await page
      .getByRole("region", { name: "Section assessment: 11.2", exact: true })
      .getByRole("link", { name: "Open assessment" })
      .click();
    await page.waitForURL("**/assessments/11.2");
    await page.getByRole("button", { name: "Start assessment" }).click();
    await page.locator('input[type="radio"][value="0"]').check();
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.getByText(/negative bound-state energy below zero/).waitFor();
    for (const [i, value] of [
      "1",
      "0",
      "2",
      "1",
      "2",
      "0",
      "2",
      "1",
      "0",
    ].entries()) {
      if (i === 5) {
        await page.locator('input[type="radio"][value="1"]').check();
        await page.getByRole("button", { name: "Check answer" }).click();
        await page
          .getByText(/Drawing boundaries do not create physical walls/)
          .waitFor();
      }
      await page.locator(`input[type="radio"][value="${value}"]`).focus();
      await page.keyboard.press("Space");
      await page.getByRole("button", { name: "Check answer" }).click();
      await page
        .getByRole("button", { name: "Continue →", exact: true })
        .click();
      if (i === 0) await page.reload();
    }
    await page.getByLabel("Your answer").fill("2.18e-18");
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.getByText(/ground-state binding magnitude/).waitFor();
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
    await page.getByLabel("Your answer").fill("1.64e-18");
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.getByRole("button", { name: "Continue →", exact: true }).click();
    await page
      .getByRole("heading", { name: "Your next steps are clearer." })
      .waitFor();
    assert.equal(
      await page
        .getByRole("progressbar", { name: "First-try understanding" })
        .getAttribute("value"),
      "70",
    );
    assert.equal(
      await page.getByRole("link", { name: "Review this concept" }).count(),
      3,
    );
    await page.getByText(/Describe an orbital as a wave function/).waitFor();
    await page.screenshot({
      path: "section112-desktop-check.png",
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
      path: "section112-mobile-check.png",
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
    assert.equal(saved.xp, 80);
    for (const id of ["11.1-3", "11.4-assessment"])
      assert.deepEqual(saved.assessments[id], seed.assessments[id]);
    await page
      .getByRole("link", { name: "Review this concept" })
      .nth(1)
      .click();
    await page.waitForURL("**/lessons/wave-mechanical");
    await page.getByRole("link", { name: "Chapter 11", exact: true }).click();
    await page
      .getByRole("link", { name: "Section 11.2 Assessment", exact: false })
      .click();
    await page.getByRole("button", { name: "Retake assessment" }).click();
    saved = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("orbital.progress.v1")),
    );
    assert.deepEqual(saved.assessments["11.2-3"].results, {});
    for (const id of ["11.1-3", "11.4-assessment"])
      assert.deepEqual(saved.assessments[id], seed.assessments[id]);
    assert.deepEqual(saved.topics, seed.topics);
    assert.deepEqual(errors, []);
    console.log(
      "PASS: Section 11.2 model/state/probability checks, photon calculation, recommendations, hints, keyboard, persistence, mobile, isolated retakes, no console errors.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
