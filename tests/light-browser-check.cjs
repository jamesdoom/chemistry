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
      .getByRole("link", { name: "Energy and Light", exact: false })
      .click();
    await page.waitForURL("**/lessons/energy-light");
    for (const label of [
      "Simpler explanation",
      "Visual explanation",
      "Concrete analogy",
      "Worked example",
    ]) {
      await page.getByRole("button", { name: /I don’t understand/ }).click();
      await page.getByText(label, { exact: true }).waitFor();
    }
    await page.getByRole("button", { name: "Explore the wave" }).click();
    const next = page.getByRole("button", {
      name: "Work through a comparison",
    });
    assert.equal(await next.isEnabled(), false);
    await page.getByLabel(/Wavelength λ/).focus();
    await page.keyboard.press("Home");
    await page.getByText("Wavelength λ: 400 nm", { exact: true }).waitFor();
    const short = await page.locator(".wave-readouts").innerText();
    assert.match(short, /7.50e\+14/);
    await page.keyboard.press("End");
    const long = await page.locator(".wave-readouts").innerText();
    assert.match(long, /4.29e\+14/);
    const pathBefore = await page.locator(".wave-path").getAttribute("d");
    await page.getByLabel(/Relative field amplitude/).focus();
    await page.keyboard.press("End");
    assert.equal(await page.locator(".wave-readouts").innerText(), long);
    assert.notEqual(
      await page.locator(".wave-path").getAttribute("d"),
      pathBefore,
    );
    assert.equal(await next.isEnabled(), true);
    await page.screenshot({ path: "light-desktop-check.png", fullPage: true });
    for (const width of [768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      );
    }
    await page.screenshot({ path: "light-mobile-check.png", fullPage: true });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await next.click();
    for (let i = 0; i < 3; i++)
      await page
        .getByRole("button", { name: "Next part of the example" })
        .click();
    await page.getByRole("button", { name: "Try the concept checks" }).click();
    for (const value of ["1", "0", "2"]) {
      await page.locator(`input[type="radio"][value="${value}"]`).check();
      await page.getByRole("button", { name: "Check answer" }).click();
      await page
        .getByRole("button", { name: "Continue →", exact: true })
        .click();
    }
    for (let i = 0; i < 4; i++)
      await page
        .getByRole("button", { name: "Next part of the example" })
        .click();
    await page.getByRole("button", { name: "Calculate with guidance" }).click();
    await page.getByLabel("Your answer").fill("600000");
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.getByText(/without converting nanometers/).waitFor();
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
    await page.getByLabel("Your answer").fill("6e14");
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.getByRole("button", { name: "Continue →", exact: true }).click();
    await page.reload();
    await page
      .getByRole("heading", { name: "Find energy per photon", exact: true })
      .waitFor();
    await page.getByLabel("Your answer").fill("2.65e-19 J");
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.getByText(/prompt supplies the units/).waitFor();
    await page.getByLabel("Your answer").fill("2.65e-19");
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
      name: "Progress: 11.1-1",
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
      "PASS: wave/amplitude controls, relationships, numerical tolerance, unit feedback, progressive help, keyboard, mobile, refresh, mastery, navigation, no console errors.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
