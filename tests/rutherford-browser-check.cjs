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
    await page.getByRole("link", { name: /Rutherford’s Atom/ }).click();
    await page.waitForURL("**/lessons/rutherford");
    await page.getByText("LEARN / SECTION 11.1", { exact: true }).waitFor();
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
      .getByRole("button", { name: "Explore the scattering paths" })
      .click();
    const next = page.getByRole("button", {
      name: "Work through the inference",
    });
    assert.equal(await next.isEnabled(), false);
    for (const id of ["far", "near", "head-on"]) {
      await page.getByLabel("Choose an approach").selectOption(id);
      assert.equal(await page.locator(".alpha-path").count(), 0);
      await page.getByRole("button", { name: "Reveal particle path" }).focus();
      await page.keyboard.press("Enter");
      assert.equal(await page.locator(".alpha-path").count(), 1);
      await page.getByText("Inferred structure:", { exact: true }).waitFor();
    }
    assert.equal(await next.isEnabled(), true);
    assert.match(await page.locator("figcaption").innerText(), /not to scale/);
    await page.screenshot({
      path: "rutherford-desktop-check.png",
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
      path: "rutherford-mobile-check.png",
      fullPage: true,
    });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await next.click();
    for (let i = 0; i < 3; i++)
      await page
        .getByRole("button", { name: "Next part of the example" })
        .click();
    await page
      .getByRole("button", { name: "Try the evidence questions" })
      .click();
    await page
      .getByRole("radio", { name: "Atoms have no electrons.", exact: true })
      .check();
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.getByText(/does not mean electrons are absent/).waitFor();
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
    for (const [i, value] of ["0", "1", "0", "2", "1"].entries()) {
      await page.locator(`input[type="radio"][value="${value}"]`).check();
      await page.getByRole("button", { name: "Check answer" }).click();
      await page
        .getByRole("button", { name: "Continue →", exact: true })
        .click();
      if (i === 0) {
        await page.reload();
        await page
          .getByRole("heading", {
            name: "Explain the change in direction",
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
      "90",
    );
    await page.getByRole("link", { name: "Back to dashboard" }).click();
    await page.reload();
    const card = page.getByRole("region", {
      name: "Progress: 11.1-0",
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
      "90",
    );
    assert.equal(await page.locator(".xp").innerText(), "✦ 50 XP");
    assert.deepEqual(errors, []);
    console.log(
      "PASS: Rutherford lesson, three qualitative paths, evidence/inference, keyboard, feedback, hints, refresh, mastery, responsive layout, navigation, no console errors.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
