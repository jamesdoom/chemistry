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
    await page.getByRole("link", { name: /The Hydrogen Orbitals/ }).click();
    await page.getByRole("button", { name: /I don’t understand/ }).click();
    await page.getByText("Simpler explanation", { exact: true }).waitFor();
    await page
      .getByRole("button", { name: "Explore shapes and boxes" })
      .click();
    const next = page.getByRole("button", {
      name: "Work through the box connection",
    });
    assert.equal(await next.isEnabled(), false);
    await page.getByLabel("Principal level n").selectOption("1");
    assert.equal(await page.locator(".shape-boxes .orbital").count(), 1);
    await page.getByLabel("Principal level n").selectOption("2");
    assert.equal(await page.locator(".shape-boxes .orbital").count(), 4);
    for (const axis of ["x", "y", "z"]) {
      const button = page.getByRole("button", {
        name: `Explore 2p${axis} orbital`,
      });
      await button.focus();
      await page.keyboard.press("Enter");
      assert.equal(await button.getAttribute("aria-pressed"), "true");
      assert.equal(
        await page.locator(".orbital-shape-figure ellipse").count(),
        2,
      );
      await page
        .getByRole("img", { name: new RegExp("oriented along the " + axis) })
        .waitFor();
    }
    await page.screenshot({
      path: "hydrogen-orbitals-desktop-check.png",
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
      path: "hydrogen-orbitals-mobile-check.png",
      fullPage: true,
    });
    await page.getByLabel("Principal level n").selectOption("3");
    assert.equal(await page.locator(".shape-boxes .orbital").count(), 9);
    assert.equal(await next.isEnabled(), true);
    await next.click();
    for (let i = 0; i < 3; i++)
      await page
        .getByRole("button", { name: "Next part of the example" })
        .click();
    await page.getByRole("button", { name: "Try the orbital checks" }).click();
    await page.getByRole("textbox").fill("2");
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.getByText(/There are two sublevels, but/).waitFor();
    await page.getByRole("textbox").fill("4");
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.getByRole("button", { name: "Continue →", exact: true }).click();
    await page.reload();
    await page
      .getByRole("heading", { name: "One orbital, two lobes", exact: true })
      .waitFor();
    await page.locator('input[value="2"]').check();
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.getByText(/Two lobes are two regions/).waitFor();
    for (const name of [
      "Hint 1",
      "Hint 2",
      "Walk me through it",
      "Show solution",
    ])
      await page.getByRole("button", { name, exact: true }).click();
    for (const value of ["1", "orientation", "orbitals"]) {
      await page.locator(`input[value="${value}"]`).check();
      await page.getByRole("button", { name: "Check answer" }).click();
      await page
        .getByRole("button", { name: "Continue →", exact: true })
        .click();
    }
    await page
      .getByRole("heading", { name: "You’ve connected the pieces." })
      .waitFor();
    await page.getByRole("link", { name: "Back to dashboard" }).click();
    await page.reload();
    await page.getByText(/Lesson progress/, { exact: true }).click();
    const card = page.getByRole("region", {
      name: "Progress: 11.3-0",
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
      "PASS: shapes, orientations, counts, keyboard, mobile, misconceptions, hints, navigation, refresh persistence, mastery, no console errors.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
