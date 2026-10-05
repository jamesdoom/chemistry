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
      .getByRole("link", { name: "Emission of Energy by Atoms", exact: false })
      .click();
    await page.waitForURL("**/lessons/atomic-emission");
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
      .getByRole("button", { name: "Explore energy transfers and spectra" })
      .click();
    const next = page.getByRole("button", {
      name: "Work through a spectrum example",
    });
    assert.equal(await next.isEnabled(), false);
    for (const id of ["absorb", "emit-small", "emit-large", "emit-upper"]) {
      await page.getByLabel("Choose a transition").selectOption(id);
      assert.equal(await page.locator(".energy-transition").count(), 0);
      await page
        .getByRole("button", { name: "Reveal energy transfer" })
        .focus();
      await page.keyboard.press("Enter");
      assert.equal(await page.locator(".energy-transition").count(), 1);
      const y1 = Number(
          await page.locator(".energy-transition").getAttribute("y1"),
        ),
        y2 = Number(
          await page.locator(".energy-transition").getAttribute("y2"),
        );
      assert.equal(y2 < y1, id === "absorb");
    }
    assert.equal(await next.isEnabled(), false);
    await page.getByLabel("Choose a spectrum view").selectOption("absorption");
    await page.getByText(/actual line strengths depend/).waitFor();
    await page.getByLabel("Choose a spectrum view").selectOption("continuous");
    assert.equal(await next.isEnabled(), true);
    await page.getByLabel("Choose a spectrum view").selectOption("emission");
    assert.match(
      await page.locator(".spectrum-figure figcaption").innerText(),
      /photon energies, not the levels/,
    );
    await page.screenshot({
      path: "emission-desktop-check.png",
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
      path: "emission-mobile-check.png",
      fullPage: true,
    });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await next.click();
    for (let i = 0; i < 4; i++)
      await page
        .getByRole("button", { name: "Next part of the example" })
        .click();
    await page.getByRole("button", { name: "Try the energy checks" }).click();
    for (const value of ["0", "1", "0"]) {
      await page.locator(`input[type="radio"][value="${value}"]`).check();
      await page.getByRole("button", { name: "Check answer" }).click();
      await page
        .getByRole("button", { name: "Continue →", exact: true })
        .click();
    }
    await page.reload();
    await page
      .getByRole("heading", {
        name: "Calculate the energy difference",
        exact: true,
      })
      .waitFor();
    await page.getByLabel("Your answer").fill("5e-19");
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.getByText(/initial state’s energy, not the gap/).waitFor();
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
    await page.getByLabel("Your answer").fill("3e-19");
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.getByRole("button", { name: "Continue →", exact: true }).click();
    await page.locator('input[type="radio"][value="1"]').check();
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.getByText(/not a picture of an electron path/).waitFor();
    await page.locator('input[type="radio"][value="2"]').check();
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.getByRole("button", { name: "Continue →", exact: true }).click();
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
      name: "Progress: 11.1-2",
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
      "PASS: absorption/emission directions, positive photon energy, gap spectrum, exploration gating, keyboard, hints, feedback, calculation, mobile, refresh, mastery, navigation, no console errors.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
