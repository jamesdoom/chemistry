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
        name: /The Wave Mechanical Model: Further Development/,
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
      .getByRole("button", { name: "Compare energies and capacities" })
      .click();
    const next = page.getByRole("button", {
      name: "Connect the filling rules",
    });
    assert.equal(await next.isEnabled(), false);
    await page.getByRole("img", { name: /Hydrogen: 2s and three/ }).waitFor();
    await page.getByRole("radio", { name: "Multi-electron atom" }).check();
    await page
      .getByRole("img", { name: /Multi-electron model: 2s below/ })
      .waitFor();
    for (const [letter, count] of [
      ["s", 1],
      ["p", 3],
      ["d", 5],
      ["f", 7],
    ]) {
      const radio = page.getByRole("radio", {
        name: letter + " sublevel",
        exact: true,
      });
      await radio.focus();
      await page.keyboard.press("Space");
      assert.equal(
        await page.locator(".capacity-boxes .orbital").count(),
        count,
      );
      await page
        .getByRole("group", {
          name: `${letter}: ${count} orbitals, ${count * 2} electrons maximum`,
          exact: true,
        })
        .waitFor();
    }
    await page.getByRole("radio", { name: /Same spins/ }).check();
    await page.getByText(/Not allowed in one orbital/).waitFor();
    await page.getByRole("radio", { name: /Opposite spins/ }).check();
    await page.getByText(/Allowed: two electrons/).waitFor();
    assert.equal(await next.isEnabled(), true);
    await page.screenshot({
      path: "further-development-desktop-check.png",
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
      path: "further-development-mobile-check.png",
      fullPage: true,
    });
    await next.click();
    await page
      .getByRole("button", { name: "Build sulfur step by step" })
      .click();
    for (let i = 0; i < 4; i++)
      await page
        .getByRole("button", { name: "Next part of the example" })
        .click();
    await page
      .getByRole("button", { name: "Try the multi-electron checks" })
      .click();
    await page.locator('input[value="number"]').check();
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.getByText(/Equal n implies equal energy/).waitFor();
    for (const [i, value] of [
      "interactions",
      "opposite",
      "10",
      "capacity",
      "correct",
    ].entries()) {
      if (i === 1) {
        await page.reload();
        await page
          .getByRole("heading", { name: "Read spin arrows", exact: true })
          .waitFor();
        await page.locator('input[value="same"]').check();
        await page.getByRole("button", { name: "Check answer" }).click();
        await page.getByText(/Parallel spins are allowed/).waitFor();
        for (const name of [
          "Hint 1",
          "Hint 2",
          "Walk me through it",
          "Show solution",
        ])
          await page.getByRole("button", { name, exact: true }).click();
      }
      if (i === 2) {
        await page.getByRole("textbox").fill("5");
        await page.getByRole("button", { name: "Check answer" }).click();
        await page.getByText(/Five counts the orbitals/).waitFor();
        await page.getByRole("textbox").fill(value);
      } else {
        await page.locator(`input[value="${value}"]`).check();
      }
      if (i === 4) {
        await page.locator('input[value="skip"]').check();
        await page.getByRole("button", { name: "Check answer" }).click();
        await page.getByText(/leaves lower-energy 3s empty/).waitFor();
        await page.locator('input[value="correct"]').check();
      }
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
      name: "Progress: 11.3-1",
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
    assert.deepEqual(errors, []);
    console.log(
      "PASS: energies, s/p/d/f capacity boxes, spin diagnostics, help, sulfur, keyboard, mobile, refresh persistence, mastery, navigation, no console errors.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
