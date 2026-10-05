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
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.goto("http://127.0.0.1:5173");
    await page.getByRole("link", { name: "Explore chapter" }).click();
    await page.waitForURL("**/chapters/chapter-11");
    assert.equal(
      await page
        .getByText("Not started · Coming later", { exact: true })
        .count(),
      3,
    );
    await page
      .getByRole("link", { name: /Electron Arrangements in the First/ })
      .click();
    await page.waitForURL("**/lessons/first-18");
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
      .getByRole("button", { name: "Let’s see where electrons go" })
      .click();
    assert.equal(await page.locator("figure .orbital").count(), 5);
    await page.getByRole("button", { name: "Work through oxygen" }).click();
    for (let i = 0; i < 4; i++)
      await page
        .getByRole("button", { name: "Next part of the example" })
        .click();
    await page.getByRole("button", { name: "Try it with guidance" }).click();
    await page.getByLabel("Your answer").fill("14");
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.getByText(/Adding protons and electrons/).waitFor();
    assert.equal(
      await page.getByText("Solution:", { exact: false }).count(),
      0,
    );
    await page.getByRole("button", { name: "Hint 1", exact: true }).click();
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
    await page.getByLabel("Your answer").fill("7");
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.getByRole("button", { name: "Continue →", exact: true }).click();
    await page.getByLabel("Your answer").fill("1s2 2s2 2p4");
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.getByText(/That configuration has 8/).waitFor();
    await page.getByLabel("Your answer").fill("1s² 2s² 2p³");
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.getByRole("button", { name: "Continue →", exact: true }).click();
    await page.getByLabel("Your answer").fill("1s2 2s2 2p6 3s2 3p6");
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.getByRole("button", { name: "Continue →", exact: true }).click();
    await page.getByText("You’ve connected the pieces.").waitFor();
    await page.getByRole("link", { name: "Back to dashboard" }).click();
    await page
      .getByRole("progressbar", { name: "Available lesson progress" })
      .waitFor();
    assert.equal(
      await page
        .getByRole("progressbar", { name: "Available lesson progress" })
        .getAttribute("value"),
      "8",
    );
    assert.equal(
      await page
        .getByRole("region", { name: "Progress: electron-arrangements" })
        .getByRole("progressbar", { name: "Topic mastery" })
        .getAttribute("value"),
      "12",
    );
    await page.reload();
    assert.equal(await page.locator(".xp").innerText(), "✦ 30 XP");
    assert.equal(
      await page
        .getByRole("region", { name: "Progress: electron-arrangements" })
        .getByRole("progressbar", { name: "Topic mastery" })
        .getAttribute("value"),
      "12",
    );
    await page.screenshot({ path: "dashboard-check.png", fullPage: true });
    await page.getByRole("link", { name: "Review lesson" }).click();
    for (let i = 0; i < 3; i++) {
      if (i === 2)
        for (let j = 0; j < 4; j++)
          await page
            .getByRole("button", { name: "Next part of the example" })
            .click();
      await page.locator(".lesson-card .primary").last().click();
    }
    await page.getByLabel("Your answer").fill("7");
    await page.getByRole("button", { name: "Check answer" }).click();
    assert.equal(await page.locator(".xp").innerText(), "✦ 30 XP");
    await page.setViewportSize({ width: 390, height: 844 });
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    );
    await page.screenshot({ path: "mobile-check.png", fullPage: true });
    assert.deepEqual(errors, []);
    console.log(
      "PASS: navigation, explanation levels, visual, worked example, feedback, hints, solution, mastery, XP deduplication, refresh, mobile overflow, console.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
