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
    await page.goto("http://127.0.0.1:5173/chapters/chapter-11");
    await page
      .getByRole("link", {
        name: "The Wave Mechanical Model of the Atom",
        exact: false,
      })
      .click();
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
      .getByRole("button", { name: "Build a probability picture" })
      .click();
    const next = page.getByRole("button", {
      name: "Work through a cloud interpretation",
    });
    assert.equal(await next.isEnabled(), false);
    assert.equal(await page.locator(".cloud-outcome").count(), 1);
    await page.getByRole("button", { name: "Show 40 outcomes" }).click();
    assert.equal(await page.locator(".cloud-outcome").count(), 40);
    await page.getByRole("button", { name: "Show 240 outcomes" }).click();
    assert.equal(await page.locator(".cloud-outcome").count(), 240);
    const positions = await page
      .locator(".cloud-outcome")
      .evaluateAll((nodes) =>
        nodes.map((n) => [n.getAttribute("cx"), n.getAttribute("cy")]),
      );
    await page.getByLabel(/Drawing guide radius/).focus();
    await page.keyboard.press("Home");
    assert.deepEqual(
      await page
        .locator(".cloud-outcome")
        .evaluateAll((nodes) =>
          nodes.map((n) => [n.getAttribute("cx"), n.getAttribute("cy")]),
        ),
      positions,
    );
    assert.equal(await next.isEnabled(), true);
    await page.screenshot({
      path: "wave-model-desktop-check.png",
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
      path: "wave-model-mobile-check.png",
      fullPage: true,
    });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await next.click();
    for (let i = 0; i < 3; i++)
      await page
        .getByRole("button", { name: "Next part of the example" })
        .click();
    await page
      .getByRole("button", { name: "Try the probability checks" })
      .click();
    await page.locator('input[type="radio"][value="0"]').check();
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.getByText(/fixed circular orbit belongs/).waitFor();
    for (const label of [
      "Hint 1",
      "Hint 2",
      "Walk me through it",
      "Show solution",
    ])
      await page.getByRole("button", { name: label, exact: true }).click();
    for (const [i, value] of ["1", "2", "0", "1"].entries()) {
      await page.locator(`input[type="radio"][value="${value}"]`).check();
      await page.getByRole("button", { name: "Check answer" }).click();
      await page
        .getByRole("button", { name: "Continue →", exact: true })
        .click();
      if (i === 0) {
        await page.reload();
        await page
          .getByRole("heading", {
            name: "Read many dots correctly",
            exact: true,
          })
          .waitFor();
      }
    }
    await page
      .getByRole("heading", { name: "You’ve connected the pieces." })
      .waitFor();
    assert.equal(
      await page
        .getByRole("progressbar", { name: "Topic mastery" })
        .getAttribute("value"),
      "88",
    );
    await page.getByRole("link", { name: "Back to dashboard" }).click();
    await page.reload();
    const card = page.getByRole("region", {
      name: "Progress: 11.2-2",
      exact: true,
    });
    assert.equal(
      await card
        .getByRole("progressbar", { name: "Lesson completion" })
        .getAttribute("value"),
      "100",
    );
    assert.equal(
      await card
        .getByRole("progressbar", { name: "Topic mastery" })
        .getAttribute("value"),
      "88",
    );
    assert.deepEqual(errors, []);
    console.log(
      "PASS: independent probability outcomes, boundary guide, keyboard, responsive layout, hints, feedback, resume, mastery, navigation, no console errors.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
