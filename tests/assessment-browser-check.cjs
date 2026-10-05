const assert = require("node:assert/strict");
const {
  chromium,
} = require("C:/Users/Brian/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
(async () => {
  const browser = await chromium.launch({ headless: true, channel: "chrome" });
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
      currentTopicId: "atomic-properties",
      topics: {
        "atomic-properties": {
          completedSteps: ["saved-step"],
          results: {
            "size-na-cl": {
              attempts: 1,
              correct: true,
              independent: true,
              helpUsed: false,
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
      .getByRole("link", { name: "Open assessment", exact: false })
      .click();
    await page.getByRole("button", { name: "Start assessment" }).click();
    await page.getByRole("radio", { name: "27", exact: true }).check();
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.getByText(/possible mass number/).waitFor();
    assert.equal(
      await page.getByText("Solution:", { exact: false }).count(),
      0,
    );
    await page.getByRole("radio", { name: "13", exact: true }).check();
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.reload();
    await page.getByText(/Saved correct answer/).waitFor();
    await page.getByRole("button", { name: "Continue →", exact: true }).click();
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
    for (let i = 1; i < 10; i++) {
      const option = page.locator('input[type="radio"][value="0"]');
      await option.focus();
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
    await page.screenshot({
      path: "assessment-desktop-check.png",
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
      path: "assessment-mobile-check.png",
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
    assert.equal(saved.xp, 30);
    await page
      .getByRole("link", { name: "Review this concept" })
      .first()
      .click();
    await page.waitForURL("**/lessons/first-18");
    await page.getByRole("link", { name: "Chapter 11", exact: true }).click();
    await page
      .getByRole("link", { name: "Section 11.4 Assessment", exact: false })
      .click();
    await page.getByRole("button", { name: "Retake assessment" }).click();
    await page
      .getByRole("heading", { name: "Neutral electron counts", exact: true })
      .waitFor();
    saved = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("orbital.progress.v1")),
    );
    assert.deepEqual(saved.topics, seed.topics);
    assert.deepEqual(saved.assessments["11.4-assessment"].results, {});
    assert.deepEqual(errors, []);
    console.log(
      "PASS: mixed assessment, targeted feedback, progressive help, keyboard, refresh/resume/report, review links, retake isolation, responsive layout, no console errors.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
