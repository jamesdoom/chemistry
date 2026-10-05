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
        name: "The Energy Levels of Hydrogen",
        exact: false,
      })
      .click();
    await page.waitForURL("**/lessons/hydrogen-levels");
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
      .getByRole("button", { name: "Explore hydrogen’s levels" })
      .click();
    const next = page.getByRole("button", {
      name: "Work through a return to ground",
    });
    assert.equal(await next.isEnabled(), false);
    for (const id of [
      "excite",
      "return",
      "small-gap",
      "large-gap",
      "ionize-ground",
      "ionize-excited",
    ]) {
      await page.getByLabel("Choose a hydrogen transition").selectOption(id);
      await page
        .getByRole("button", { name: "Reveal hydrogen transition" })
        .focus();
      await page.keyboard.press("Enter");
      const arrow = page.locator(".energy-transition");
      assert.equal(await arrow.count(), 1);
      assert.equal(
        Number(await arrow.getAttribute("y2")) <
          Number(await arrow.getAttribute("y1")),
        id === "excite" || id.startsWith("ionize"),
      );
    }
    assert.equal(await next.isEnabled(), true);
    await page.getByText(/zero electron kinetic energy/).waitFor();
    await page.screenshot({
      path: "hydrogen-desktop-check.png",
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
      path: "hydrogen-mobile-check.png",
      fullPage: true,
    });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await next.click();
    for (let i = 0; i < 3; i++)
      await page
        .getByRole("button", { name: "Next part of the example" })
        .click();
    await page.getByRole("button", { name: "Try the level checks" }).click();
    await page.locator('input[type="radio"][value="2"]').check();
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.getByText(/An excited electron remains bound/).waitFor();
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
            name: "A lower state can still be excited",
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
    await page
      .getByRole("link", { name: "Continue to the Bohr Model" })
      .click();
    await page.waitForURL("**/lessons/bohr-model");
    await page
      .getByRole("button", { name: "Explore the historical picture" })
      .click();
    const bohrNext = page.getByRole("button", {
      name: "Work through the model’s limits",
    });
    assert.equal(await bohrNext.isEnabled(), false);
    for (const n of [2, 3]) {
      await page.locator(`input[name="bohr-level"][value="${n}"]`).focus();
      await page.keyboard.press("Space");
    }
    assert.equal(await bohrNext.isEnabled(), true);
    assert.equal(await page.locator(".bohr-orbit").count(), 3);
    assert.match(
      await page.locator(".bohr-figure figcaption").innerText(),
      /not a measured position/,
    );
    await page.screenshot({ path: "bohr-desktop-check.png", fullPage: true });
    for (const width of [768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      );
    }
    await page.screenshot({ path: "bohr-mobile-check.png", fullPage: true });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await bohrNext.click();
    for (let i = 0; i < 3; i++)
      await page
        .getByRole("button", { name: "Next part of the example" })
        .click();
    await page.getByRole("button", { name: "Try the model checks" }).click();
    for (const [i, value] of ["2", "0", "1", "2"].entries()) {
      if (i === 3) {
        await page.locator('input[type="radio"][value="1"]').check();
        await page.getByRole("button", { name: "Check answer" }).click();
        await page
          .getByText(/probability description, not a Bohr circular orbit/)
          .waitFor();
      }
      await page.locator(`input[type="radio"][value="${value}"]`).check();
      await page.getByRole("button", { name: "Check answer" }).click();
      await page
        .getByRole("button", { name: "Continue →", exact: true })
        .click();
    }
    await page
      .getByRole("heading", { name: "You’ve connected the pieces." })
      .waitFor();
    assert.equal(
      await page
        .getByRole("progressbar", { name: "Topic mastery" })
        .getAttribute("value"),
      "100",
    );
    await page.getByRole("link", { name: "Back to dashboard" }).click();
    await page.reload();
    for (const [id, score] of [
      ["11.2-0", "88"],
      ["11.2-1", "100"],
    ]) {
      const card = page.getByRole("region", {
        name: `Progress: ${id}`,
        exact: true,
      });
      assert.equal(
        await card
          .getByRole("progressbar", { name: "Topic mastery" })
          .getAttribute("value"),
        score,
      );
      assert.equal(
        await card
          .getByRole("progressbar", { name: "Lesson completion" })
          .getAttribute("value"),
        "100",
      );
    }
    assert.equal(await page.locator(".xp").innerText(), "✦ 80 XP");
    assert.deepEqual(errors, []);
    console.log(
      "PASS: both hydrogen/Bohr lessons, unequal gaps, excitation/ionization, model limits, keyboard, hints, resume, separate mastery, responsive layouts, links, no console errors.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
