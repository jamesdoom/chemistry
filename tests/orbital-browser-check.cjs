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
    await page.getByRole("link", { name: "Practice orbital filling" }).click();
    await page.waitForURL("**/practice/orbitals");
    const slot = (sublevel, orbital, index) =>
      page.getByRole("button", {
        name: new RegExp(`^${sublevel} orbital ${orbital}, slot ${index}:`),
      });
    const check = () =>
      page
        .getByRole("button", { name: "Check arrangement", exact: true })
        .click();
    async function fill(entries) {
      await page
        .getByRole("button", { name: "Clear diagram", exact: true })
        .click();
      for (const [address, spins] of Object.entries(entries)) {
        const [sublevel, orbital] = address.split("-");
        for (let i = 0; i < spins.length; i++) {
          await slot(sublevel, orbital, i + 1).click();
          if (spins[i] === "down") await slot(sublevel, orbital, i + 1).click();
        }
      }
    }
    const pair = ["up", "down"];
    // Keyboard interaction changes an actual orbital slot.
    await slot("1s", 1, 1).focus();
    await page.keyboard.press("Enter");
    assert.match(await slot("1s", 1, 1).getAttribute("aria-label"), /spin up/);
    await page.keyboard.press("Space");
    assert.match(
      await slot("1s", 1, 1).getAttribute("aria-label"),
      /spin down/,
    );
    await page.keyboard.press("Enter");
    assert.match(await slot("1s", 1, 1).getAttribute("aria-label"), /empty/);
    await check();
    await page
      .locator(".orbital-feedback")
      .getByText("Check the electron count", { exact: true })
      .waitFor();
    assert.equal(await page.locator(".solution-panel").count(), 0);
    await fill({ "1s-1": pair, "2p-1": pair, "2p-2": pair, "2p-3": pair });
    await check();
    await page
      .locator(".orbital-feedback")
      .getByText("Aufbau principle", { exact: true })
      .waitFor();
    assert.match(
      await page.locator(".orbital-feedback").innerText(),
      /2s still has room/,
    );
    await fill({
      "1s-1": ["up", "up"],
      "2s-1": pair,
      "2p-1": pair,
      "2p-2": ["up"],
      "2p-3": ["up"],
    });
    await check();
    await page
      .locator(".orbital-feedback")
      .getByText("Pauli exclusion principle", { exact: true })
      .waitFor();
    await fill({ "1s-1": pair, "2s-1": pair, "2p-1": pair, "2p-2": pair });
    await check();
    await page
      .locator(".orbital-feedback")
      .getByText("Hund’s rule", { exact: true })
      .waitFor();
    assert.match(
      await page.locator(".orbital-feedback").innerText(),
      /another orbital is empty/,
    );
    await fill({
      "1s-1": pair,
      "2s-1": pair,
      "2p-1": pair,
      "2p-2": ["up"],
      "2p-3": ["down"],
    });
    await check();
    assert.match(
      await page.locator(".orbital-feedback").innerText(),
      /different directions/,
    );
    // Permuted p boxes and reversed parallel singles are accepted.
    await fill({
      "1s-1": pair,
      "2s-1": pair,
      "2p-1": ["down"],
      "2p-2": ["down"],
      "2p-3": pair,
    });
    await check();
    await page
      .getByText("This ground-state arrangement works.", { exact: true })
      .waitFor();
    assert.equal(await page.locator(".xp").innerText(), "✦ 10 XP");
    await page.reload();
    assert.equal(await page.locator(".xp").innerText(), "✦ 10 XP");
    await page
      .getByText("Previously solved independently", { exact: true })
      .waitFor();
    assert.equal(
      await page
        .getByRole("progressbar", { name: "Topic mastery" })
        .getAttribute("value"),
      "5",
    );
    // Repetition cannot farm XP; full help flow only reveals the answer at stage 4.
    await page.getByRole("button", { name: "Hint 1", exact: true }).click();
    await page.getByRole("button", { name: "Hint 2", exact: true }).click();
    await page
      .getByRole("button", { name: "Walk me through it", exact: true })
      .click();
    assert.equal(await page.locator(".solution-panel").count(), 0);
    await page
      .getByRole("button", { name: "Show solution", exact: true })
      .click();
    await page
      .getByText("One valid solution for oxygen", { exact: true })
      .waitFor();
    await fill({
      "1s-1": pair,
      "2s-1": pair,
      "2p-1": pair,
      "2p-2": ["up"],
      "2p-3": ["up"],
    });
    await check();
    assert.equal(await page.locator(".xp").innerText(), "✦ 10 XP");
    await page.getByRole("button", { name: "Try another atom" }).click();
    assert.equal(
      await page.getByLabel("Choose a neutral atom").inputValue(),
      "9",
    );
    assert.equal(await page.locator(".solution-panel").count(), 0);
    // Fresh supported success receives half mastery evidence.
    await page.getByLabel("Choose a neutral atom").selectOption("2");
    await page.getByRole("button", { name: "Hint 1", exact: true }).click();
    await fill({ "1s-1": pair });
    await check();
    assert.equal(await page.locator(".xp").innerText(), "✦ 20 XP");
    assert.equal(
      await page
        .getByRole("progressbar", { name: "Topic mastery" })
        .getAttribute("value"),
      "7",
    );
    await page
      .getByRole("button", { name: "Practice again without hints" })
      .click();
    await fill({ "1s-1": pair });
    await check();
    assert.equal(
      await page
        .getByRole("progressbar", { name: "Topic mastery" })
        .getAttribute("value"),
      "10",
    );
    assert.equal(await page.locator(".xp").innerText(), "✦ 20 XP");
    await page.getByLabel("Choose a neutral atom").selectOption("8");
    await fill({
      "1s-1": ["up", "up"],
      "2p-1": ["up", "up"],
      "3s-1": pair,
      "3p-1": pair,
    });
    await check();
    await page.screenshot({
      path: "orbital-desktop-check.png",
      fullPage: true,
    });
    for (const width of [768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `overflow at ${width}`,
      );
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: "orbital-mobile-check.png", fullPage: true });
    await page
      .getByRole("link", { name: "Electron arrangements lesson" })
      .click();
    await page.waitForURL("**/lessons/first-18");
    assert.deepEqual(errors, []);
    console.log(
      "PASS: all rule feedback, correct alternatives, keyboard controls, hints, mastery, refresh, XP deduplication, atom switching, desktop/tablet/mobile and no console errors.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
