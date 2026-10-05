const assert = require("node:assert/strict");
const { chromium } = require(
  process.env.PLAYWRIGHT_MODULE ||
    "C:/Users/Brian/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright",
);
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
    // Existing local results must survive the new module; no demo progress enters the app.
    const oldResults = Object.fromEntries(
      ["neutral-count", "nitrogen-config", "argon-check"].map((id) => [
        id,
        { attempts: 1, correct: true, independent: true, helpUsed: false },
      ]),
    );
    await page.evaluate(
      (results) =>
        localStorage.setItem(
          "orbital.progress.v1",
          JSON.stringify({
            version: 1,
            xp: 30,
            currentTopicId: "electron-arrangements",
            topics: {
              "electron-arrangements": {
                completedSteps: [
                  "concept",
                  "visual",
                  "example",
                  "practice-1",
                  "practice-2",
                  "checkpoint",
                ],
                results,
              },
            },
          }),
        ),
      oldResults,
    );
    await page.reload();
    await page
      .getByRole("link", { name: "Continue learning", exact: false })
      .click();
    await page.waitForURL("**/lessons/periodic-table");
    for (const label of [
      "Simpler explanation",
      "Visual explanation",
      "Concrete analogy",
      "Worked example",
    ]) {
      await page.getByRole("button", { name: /I don’t understand/ }).click();
      await page.getByText(label, { exact: true }).waitFor();
    }
    await page
      .getByRole("button", { name: "Find oxygen’s outer electrons" })
      .click();
    assert.equal(await page.locator(".outer-entry").count(), 2);
    await page
      .getByText("See the difference: 8 total, 6 outer", { exact: true })
      .waitFor();
    await page
      .getByRole("button", { name: "Connect the pattern to a location" })
      .click();
    for (let i = 0; i < 4; i++)
      await page
        .getByRole("button", { name: "Next part of the example" })
        .click();
    await page
      .getByRole("button", { name: "Explore the first 18 atoms" })
      .click();
    assert.equal(await page.locator(".element-button").count(), 18);
    const proceed = page.getByRole("button", {
      name: "Try the pattern with guidance",
    });
    assert.equal(await proceed.isEnabled(), false);
    const nitrogen = page.getByRole("button", {
      name: "Nitrogen, atomic number 7, period 2, group 15",
      exact: true,
    });
    await nitrogen.focus();
    await page.keyboard.press("Enter");
    await page
      .getByRole("heading", {
        name: "Nitrogen: period 2, group 15",
        exact: true,
      })
      .waitFor();
    await page
      .getByRole("button", {
        name: "Helium, atomic number 2, period 1, group 18",
        exact: true,
      })
      .click();
    await page
      .getByRole("heading", { name: "Helium: period 1, group 18", exact: true })
      .waitFor();
    assert.match(
      await page.locator(".element-detail").innerText(),
      /Helium is the exception/,
    );
    assert.equal(await proceed.isEnabled(), false);
    await page
      .getByRole("button", {
        name: "Neon, atomic number 10, period 2, group 18",
        exact: true,
      })
      .click();
    assert.equal(await proceed.isEnabled(), true);
    await page
      .getByRole("button", {
        name: "Oxygen, atomic number 8, period 2, group 16",
        exact: true,
      })
      .click();
    await page.screenshot({
      path: "periodic-desktop-check.png",
      fullPage: true,
    });
    for (const width of [768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `overflow at ${width}`,
      );
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({
      path: "periodic-mobile-check.png",
      fullPage: true,
    });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await proceed.click();
    await page.getByLabel("Your answer").fill("7");
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.getByText(/Seven is the total electron count/).waitFor();
    await page.getByRole("button", { name: "Hint 1", exact: true }).click();
    await page.getByLabel("Your answer").fill("5");
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.getByRole("button", { name: "Continue →", exact: true }).click();
    // Mid-lesson refresh resumes at the next unfinished step and retains scored evidence.
    await page.reload();
    await page
      .getByRole("heading", { name: "Read oxygen’s period", exact: true })
      .waitFor();
    assert.equal(await page.locator(".xp").innerText(), "✦ 40 XP");
    for (const [wrong, feedback, answer] of [
      ["4", "The superscript 4 counts electrons", "2"],
      ["8", "Eight is the valence-electron count", "18"],
      ["12", "Twelve counts every electron", "2"],
      ["2", "Two is the outer electron count", "3"],
      ["12", "Adding 10 applies to the p-block", "2"],
    ]) {
      await page.getByLabel("Your answer").fill(wrong);
      await page.getByRole("button", { name: "Check answer" }).click();
      await page.getByText(new RegExp(feedback)).waitFor();
      await page.getByLabel("Your answer").fill(answer);
      await page.getByRole("button", { name: "Check answer" }).click();
      await page
        .getByRole("button", { name: "Continue →", exact: true })
        .click();
    }
    await page
      .getByText("You’ve connected the pieces.", { exact: true })
      .waitFor();
    assert.match(
      await page.locator(".lesson-card").innerText(),
      /Outer energy level → period/,
    );
    assert.equal(
      await page
        .getByRole("progressbar", { name: "Topic mastery" })
        .getAttribute("value"),
      "92",
    );
    await page.getByRole("link", { name: "Back to dashboard" }).click();
    await page.reload();
    assert.equal(await page.locator(".xp").innerText(), "✦ 90 XP");
    const oldCard = page.getByRole("region", {
      name: "Progress: electron-arrangements",
      exact: true,
    });
    const newCard = page.getByRole("region", {
      name: "Progress: configurations-periodic-table",
      exact: true,
    });
    assert.equal(
      await oldCard
        .getByRole("progressbar", { name: "Lesson completion" })
        .getAttribute("value"),
      "100",
    );
    assert.equal(
      await oldCard
        .getByRole("progressbar", { name: "Topic mastery" })
        .getAttribute("value"),
      "14",
    );
    assert.equal(
      await newCard
        .getByRole("progressbar", { name: "Lesson completion" })
        .getAttribute("value"),
      "100",
    );
    assert.equal(
      await newCard
        .getByRole("progressbar", { name: "Topic mastery" })
        .getAttribute("value"),
      "92",
    );
    assert.equal(
      await page
        .getByRole("progressbar", { name: "Available lesson progress" })
        .getAttribute("value"),
      "55",
    );
    assert.deepEqual(
      await page.evaluate(
        () =>
          JSON.parse(localStorage.getItem("orbital.progress.v1")).topics[
            "electron-arrangements"
          ].results,
      ),
      oldResults,
    );
    await page.getByRole("link", { name: "Chapter 11", exact: true }).click();
    await page
      .getByRole("link", {
        name: "Electron Configurations and the Periodic Table",
        exact: false,
      })
      .click();
    await page.waitForURL("**/lessons/periodic-table");
    assert.deepEqual(errors, []);
    console.log(
      "PASS: valence visual, all 18 table elements, helium exception, keyboard, exploration gating, feedback, supported mastery, mid-lesson resume, topic isolation, persistence, navigation, responsive layout, and no console errors.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
