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
    await page.getByRole("link", { name: "Open chapter review" }).click();
    await page
      .getByRole("region", { name: "All 15 curriculum topics" })
      .waitFor();
    assert.equal(
      await page
        .getByRole("region", { name: "All 15 curriculum topics" })
        .getByRole("link")
        .count(),
      15,
    );
    await page.getByText(/No weak-topic evidence yet/).waitFor();
    const seed = {
      version: 1,
      xp: 40,
      currentTopicId: "electron-arrangements",
      topics: {
        "electron-arrangements": {
          completedSteps: ["concept"],
          results: {
            "neutral-count": {
              attempts: 1,
              correct: true,
              independent: false,
              helpUsed: true,
            },
          },
        },
      },
      assessments: {
        "11.3-2": {
          results: {
            "assessment-11.3-hund": {
              attempts: 2,
              firstCorrect: false,
              correct: true,
              helpUsed: false,
              completed: true,
            },
          },
        },
      },
    };
    await page.evaluate(
      (s) => localStorage.setItem("orbital.progress.v1", JSON.stringify(s)),
      seed,
    );
    await page.reload();
    const paths = page.getByRole("region", {
      name: "Recommended review paths",
    });
    assert.equal(
      await paths.getByRole("link", { name: "Review this lesson" }).count(),
      2,
    );
    await paths.getByText(/Lesson practice is below 80%/).waitFor();
    await paths.getByText(/Compare \[↑↓\]/).waitFor();
    await paths
      .getByRole("link", { name: "Review this lesson" })
      .first()
      .click();
    await page.waitForURL("**/lessons/first-18");
    await page.goto("http://127.0.0.1:5173/review/chapter-11");
    await page.getByRole("link", { name: "Open mixed chapter check" }).click();
    await page.getByRole("button", { name: "Start assessment" }).click();
    const values = [
      "nucleus",
      "short",
      "5.2e-19",
      "emission",
      "limits",
      "distribution",
      "four",
      "split",
      "hund",
      "correct",
      "group16",
      "sublevel",
    ];
    for (const [i, value] of values.entries()) {
      if (i === 0) {
        await page.locator('input[value="spread"]').check();
        await page.getByRole("button", { name: "Check answer" }).click();
        await page.getByText(/broadly spread charge/).waitFor();
      }
      if (i === 2) {
        await page.getByLabel("Your answer").fill("8.4e-19");
        await page.getByRole("button", { name: "Check answer" }).click();
        await page.getByText(/starting level, not the gap/).waitFor();
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
        await page.getByLabel("Your answer").fill(value);
      } else {
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
      "83",
    );
    await page
      .getByRole("link", { name: "Open your chapter review paths" })
      .click();
    await page.reload();
    assert.equal(
      await paths.getByRole("link", { name: "Review this lesson" }).count(),
      4,
    );
    assert.equal(
      await page
        .getByRole("region", { name: "All 15 curriculum topics" })
        .getByRole("link")
        .count(),
      15,
    );
    await page.screenshot({
      path: "chapter-review-desktop-check.png",
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
      path: "chapter-review-mobile-check.png",
      fullPage: true,
    });
    let saved = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("orbital.progress.v1")),
    );
    assert.deepEqual(saved.topics, seed.topics);
    assert.deepEqual(saved.assessments["11.3-2"], seed.assessments["11.3-2"]);
    assert.equal(saved.xp, seed.xp);
    await page.getByRole("link", { name: "Open mixed chapter check" }).click();
    await page.getByRole("button", { name: "Retake assessment" }).click();
    await page.goto("http://127.0.0.1:5173/review/chapter-11");
    assert.equal(
      await paths.getByRole("link", { name: "Review this lesson" }).count(),
      2,
    );
    assert.deepEqual(errors, []);
    console.log(
      "PASS: connected review, weak paths, mixed check, hints, resume, report, isolated retake, preserved lesson and section evidence, keyboard/mobile, no console errors.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
