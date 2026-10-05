// Phone touch checks and desktop defaults. Run with node --experimental-strip-types.
const assert = require("node:assert/strict");
const {
  chromium,
} = require("C:/Users/Brian/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
(async () => {
  const { lessons } = await import("../src/data/chapters/chapter11.ts");
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  try {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    const noOverflow = async () =>
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      );
    await page.goto("http://127.0.0.1:5173/");
    assert.equal(await page.locator(".dashboard-group[open]").count(), 0);
    const screens = await page.evaluate(
      () => document.documentElement.scrollHeight / 844,
    );
    assert.ok(screens < 4, `Dashboard takes ${screens.toFixed(1)} screens`);
    await page.screenshot({
      path: "mobile-usability-dashboard-check.png",
      fullPage: true,
    });
    await page.getByRole("link", { name: "Continue learning" }).tap();
    await page.getByRole("button", { name: /I don’t understand/ }).tap();
    await page.getByText("Simpler explanation", { exact: true }).waitFor();
    await page.goto("http://127.0.0.1:5173/");
    await page
      .getByText("Section checks · 4 assessments", { exact: true })
      .tap();
    await page
      .getByRole("region", { name: "Section assessment: 11.3", exact: true })
      .getByRole("link", { name: "Open assessment" })
      .tap();
    await page.getByRole("button", { name: "Start assessment" }).tap();
    await page.locator('input[value="probability"]').tap();
    await page.getByRole("button", { name: "Check answer" }).tap();
    await page.getByRole("button", { name: "Continue →", exact: true }).tap();
    await page.reload();
    await page
      .getByRole("heading", {
        name: "One p orbital versus the p sublevel",
        exact: true,
      })
      .waitFor();
    await page.goto("http://127.0.0.1:5173/");
    const lessonToggle = page.getByText("Lesson progress · 11 lessons", {
      exact: true,
    });
    await lessonToggle.focus();
    await page.keyboard.press("Enter");
    assert.equal(
      await page
        .getByRole("region", { name: "Progress: 11.3-1", exact: true })
        .isVisible(),
      true,
    );
    await noOverflow();
    for (const width of [390, 320]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("http://127.0.0.1:5173/practice/orbitals");
      for (const box of await page.locator("button.electron-slot").all()) {
        const r = await box.boundingBox();
        assert.ok(r.width >= 48 && r.height >= 48);
      }
      await page
        .getByRole("button", {
          name: "1s orbital 1, slot 1: empty",
          exact: true,
        })
        .tap();
      await page
        .getByRole("button", {
          name: "1s orbital 1, slot 1: spin up",
          exact: true,
        })
        .tap();
      await page
        .getByRole("button", {
          name: "1s orbital 1, slot 1: spin down",
          exact: true,
        })
        .waitFor();
      await noOverflow();
      await page.screenshot({
        path: `mobile-usability-orbitals-${width}-check.png`,
        fullPage: true,
      });
      const lesson = lessons.find((l) => l.id === "periodic-table");
      const index = lesson.steps.findIndex((s) => s.kind === "periodic-table");
      await page.evaluate(
        ({ lesson, index }) => {
          const p = JSON.parse(localStorage.getItem("orbital.progress.v1"));
          p.topics[lesson.topicId] = {
            completedSteps: lesson.steps.slice(0, index).map((s) => s.id),
            results: {},
          };
          localStorage.setItem("orbital.progress.v1", JSON.stringify(p));
        },
        { lesson, index },
      );
      await page.goto("http://127.0.0.1:5173/lessons/periodic-table");
      await page.getByLabel("Choose an element").selectOption("7");
      await page.getByLabel("Choose an element").selectOption("8");
      await page.getByLabel("Choose an element").selectOption("10");
      await page
        .getByRole("heading", { name: "Neon: period 2, group 18", exact: true })
        .waitFor();
      assert.equal(
        await page
          .getByRole("button", { name: "Try the pattern with guidance" })
          .isEnabled(),
        true,
      );
      for (const box of await page.locator(".element-button").all()) {
        const r = await box.boundingBox();
        assert.ok(r.width >= 48 && r.height >= 48);
      }
      const table = page.getByRole("region", {
        name: "Scrollable periodic table",
        exact: true,
      });
      await table.focus();
      await page.keyboard.press("End");
      await page
        .getByRole("button", {
          name: "Argon, atomic number 18, period 3, group 18",
          exact: true,
        })
        .tap();
      await page
        .getByRole("heading", {
          name: "Argon: period 3, group 18",
          exact: true,
        })
        .waitFor();
      await noOverflow();
      await page.screenshot({
        path: `mobile-usability-periodic-${width}-check.png`,
        fullPage: true,
      });
      const wave = lessons.find((l) => l.id === "energy-light");
      const wi = wave.steps.findIndex((s) => s.kind === "wave-explorer");
      await page.evaluate(
        ({ wave, wi }) => {
          const p = JSON.parse(localStorage.getItem("orbital.progress.v1"));
          p.topics[wave.topicId] = {
            completedSteps: wave.steps.slice(0, wi).map((s) => s.id),
            results: {},
          };
          localStorage.setItem("orbital.progress.v1", JSON.stringify(p));
        },
        { wave, wi },
      );
      await page.goto("http://127.0.0.1:5173/lessons/energy-light");
      const frame = page.getByRole("region", {
        name: "Light wave diagram",
        exact: true,
      });
      assert.ok(await frame.evaluate((e) => e.scrollWidth > e.clientWidth));
      const font = await frame
        .locator("svg text")
        .first()
        .evaluate((e) => {
          const svg = e.closest("svg");
          return (
            (parseFloat(getComputedStyle(e).fontSize) *
              svg.getBoundingClientRect().width) /
            svg.viewBox.baseVal.width
          );
        });
      assert.ok(font >= 14, `Rendered diagram font ${font}`);
      await frame.focus();
      await page.keyboard.press("ArrowRight");
      await page.waitForFunction(
        () => document.querySelector(".diagram-scroll")?.scrollLeft > 0,
      );
      await noOverflow();
      await page.screenshot({
        path: `mobile-usability-wave-${width}-check.png`,
        fullPage: true,
      });
    }
    const desktop = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
    });
    await desktop.goto("http://127.0.0.1:5173/");
    assert.equal(await desktop.locator(".dashboard-group[open]").count(), 3);
    assert.equal(await desktop.locator(".focus-card").isVisible(), true);
    await page.goto("http://127.0.0.1:5173/");
    await page.setViewportSize({ width: 768, height: 1000 });
    await page.waitForFunction(
      () => document.querySelectorAll(".dashboard-group[open]").length === 3,
    );
    assert.equal(await page.locator(".dashboard-group[open]").count(), 3);
    await noOverflow();
    assert.deepEqual(errors, []);
    console.log(
      `PASS: dashboard ${screens.toFixed(1)} phone screens, touch/keyboard expanders, 48px controls, element picker and table scrolling, legible diagram labels, no page overflow, saved assessment resume, desktop/tablet defaults, no console errors.`,
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
