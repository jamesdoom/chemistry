const assert = require("node:assert/strict");
const {
  chromium,
} = require("C:/Users/Brian/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  try {
    const p = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const errors = [];
    p.on("pageerror", (e) => errors.push(e.message));
    await p.goto("http://127.0.0.1:5173/");
    await p.getByRole("link", { name: "Open atomic-radius path" }).click();
    await p.getByRole("link", { name: "Continue atomic-radius path" }).click();
    await p.getByRole("button", { name: /I don’t understand/ }).click();
    await p.getByText("Simpler explanation", { exact: true }).waitFor();
    await p.getByRole("button", { name: "Compare two atoms visually" }).click();
    await p
      .getByRole("button", { name: "Work through a down-group comparison" })
      .click();
    for (let i = 0; i < 3; i++)
      await p.getByRole("button", { name: "Next part of the example" }).click();
    await p.getByRole("button", { name: "Try the size comparisons" }).click();
    await p.locator('input[value="edge"]').check();
    await p.getByRole("button", { name: "Check answer" }).click();
    await p.getByText(/no sharp stopping surface/).waitFor();
    for (const name of [
      "Hint 1",
      "Hint 2",
      "Walk me through it",
      "Show solution",
    ])
      await p.getByRole("button", { name, exact: true }).click();
    for (const [i, value] of [
      "radius",
      "pull",
      "levels",
      "newlevel",
    ].entries()) {
      await p.locator(`input[value="${value}"]`).check();
      await p.getByRole("button", { name: "Check answer" }).click();
      await p.getByRole("button", { name: "Continue →", exact: true }).click();
      if (i === 0) await p.reload();
    }
    await p
      .getByRole("heading", { name: "You’ve connected the pieces." })
      .waitFor();
    assert.equal(
      await p
        .getByRole("progressbar", { name: "Topic mastery" })
        .getAttribute("value"),
      "88",
    );
    await p
      .getByRole("link", { name: "Back to the atomic-radius path" })
      .click();
    await p.reload();
    await p.getByText("7 of 7 steps complete", { exact: true }).waitFor();
    for (const width of [320, 768, 1440]) {
      await p.setViewportSize({ width, height: 1000 });
      assert.ok(
        await p.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      );
    }
    assert.deepEqual(errors, []);
    console.log(
      "PASS: focused path, concepts, visuals, worked example, targeted feedback, hints, mastery, refresh, responsive navigation.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
