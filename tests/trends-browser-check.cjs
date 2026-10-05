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
    await page
      .getByRole("region", { name: "Progress: atomic-properties", exact: true })
      .getByRole("link", { name: "Open this lesson" })
      .click();
    await page.waitForURL("**/lessons/atomic-trends");
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
      .getByRole("button", { name: "Compare two electron clouds" })
      .click();
    assert.equal(await page.locator(".trend-atom-card svg").count(), 2);
    assert.equal(
      await page.getByText("Larger atom", { exact: true }).count(),
      1,
    );
    assert.match(
      await page.locator(".trend-comparison").innerText(),
      /not measured radii/,
    );
    await page
      .getByRole("button", { name: "Work through the size prediction" })
      .click();
    for (let i = 0; i < 3; i++)
      await page
        .getByRole("button", { name: "Next part of the example" })
        .click();
    await page
      .getByRole("button", { name: "Learn what removal energy means" })
      .click();
    await page
      .getByRole("heading", {
        name: "First ionization energy: the cost of losing one electron",
        exact: true,
      })
      .waitFor();
    await page
      .getByRole("button", { name: "Compare lithium and sodium" })
      .click();
    await page
      .getByRole("button", { name: "Show the removal process" })
      .focus();
    await page.keyboard.press("Enter");
    assert.equal(await page.locator(".ionization-equation").count(), 2);
    assert.match(
      await page.locator(".ionization-equation").first().innerText(),
      /Li\(g\) \+ energy/,
    );
    for (let i = 0; i < 3; i++)
      await page
        .getByRole("button", { name: "Next part of the example" })
        .click();
    await page
      .getByRole("button", { name: "Explore trends and their exceptions" })
      .click();
    const proceed = page.getByRole("button", {
      name: "Try it with guidance",
      exact: false,
    });
    assert.equal(await proceed.isEnabled(), false);
    for (const id of [
      "size-across",
      "ie-down",
      "ie-across",
      "ie-sublevel-exception",
    ])
      await page.getByLabel("Choose a comparison").selectOption(id);
    assert.equal(await proceed.isEnabled(), false);
    assert.match(
      await page.locator(".trend-reason").innerText(),
      /higher-energy 2p/,
    );
    await page
      .getByLabel("Choose a comparison")
      .selectOption("ie-pairing-exception");
    assert.equal(await proceed.isEnabled(), true);
    assert.match(
      await page.locator(".trend-reason").innerText(),
      /Repulsion within that pair/,
    );
    const nitrogen = page
      .locator(".trend-atom-card")
      .filter({ hasText: "Nitrogen" });
    assert.match(await nitrogen.innerText(), /Higher first ionization energy/);
    await page.screenshot({ path: "trends-desktop-check.png", fullPage: true });
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
    await page.screenshot({ path: "trends-mobile-check.png", fullPage: true });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await proceed.click();
    await page.getByRole("radio", { name: "Cl", exact: true }).check();
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.getByText(/More protons do not make/).waitFor();
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
    await page.getByRole("radio", { name: "Na", exact: true }).check();
    await page.getByRole("button", { name: "Check answer" }).click();
    await page.getByRole("button", { name: "Continue →", exact: true }).click();
    await page.reload();
    await page
      .getByRole("heading", {
        name: "Explain the size change down a group",
        exact: true,
      })
      .waitFor();
    assert.equal(await page.locator(".xp").innerText(), "✦ 10 XP");
    const cases = [
      [
        /More protons always/,
        /Nuclear charge attracts/,
        /Its outer electron occupies/,
      ],
      [/^Na$/, /Sodium has more protons/, /^Li$/],
      [
        /Energy is released/,
        /A low first ionization energy still/,
        /Energy must be supplied/,
      ],
      [/^Cl$/, /Chlorine’s added nuclear charge/, /^Mg$/],
      [/^Al$/, /general across-row trend has exceptions/, /^Mg$/],
      [/^O$/, /extra proton does not make/, /^N$/],
    ];
    for (const [wrong, feedback, correct] of cases) {
      await page.getByRole("radio", { name: wrong }).check();
      await page.getByRole("button", { name: "Check answer" }).click();
      await page.getByText(feedback).waitFor();
      await page.getByRole("radio", { name: correct }).focus();
      await page.keyboard.press("Space");
      await page.getByRole("button", { name: "Check answer" }).click();
      await page
        .getByRole("button", { name: "Continue →", exact: true })
        .click();
    }
    await page
      .getByText("You’ve connected the pieces.", { exact: true })
      .waitFor();
    assert.equal(
      await page
        .getByRole("progressbar", { name: "Topic mastery" })
        .getAttribute("value"),
      "93",
    );
    await page.getByRole("link", { name: "Back to dashboard" }).click();
    await page.reload();
    const card = page.getByRole("region", {
      name: "Progress: atomic-properties",
      exact: true,
    });
    assert.equal(
      await card
        .getByRole("progressbar", { name: "Topic mastery" })
        .getAttribute("value"),
      "93",
    );
    assert.equal(
      await card
        .getByRole("progressbar", { name: "Lesson completion" })
        .getAttribute("value"),
      "100",
    );
    assert.equal(await page.locator(".xp").innerText(), "✦ 70 XP");
    await page.getByRole("link", { name: "Chapter 11", exact: true }).click();
    await page
      .getByRole("link", {
        name: "Atomic Properties and the Periodic Table",
        exact: false,
      })
      .click();
    await page.waitForURL("**/lessons/atomic-trends");
    assert.deepEqual(errors, []);
    console.log(
      "PASS: cloud visual, removal equation, keyboard, comparison gating, exceptions, choice feedback, complete help path, resume, mastery, persistence, mobile/tablet layout, navigation, and no console errors.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
