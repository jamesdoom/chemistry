const assert = require("node:assert/strict");
const {
  chromium,
} = require("C:/Users/Brian/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
(async () => {
  const b = await chromium.launch({ channel: "chrome", headless: true });
  try {
    const p = await b.newPage({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const errors = [];
    p.on("pageerror", (e) => errors.push(e.message));
    p.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    await p.goto("http://127.0.0.1:5173/lessons/atomic-radius-graphing");
    await p.getByRole("button", { name: "See a plotted-point example" }).tap();
    for (let i = 0; i < 3; i++)
      await p.getByRole("button", { name: "Next part of the example" }).tap();
    await p.getByRole("button", { name: "Build the radius graph" }).tap();
    await p.getByLabel("Horizontal axis (x)").selectOption("radius");
    await p.getByLabel("Vertical axis (y)").selectOption("number");
    await p.getByRole("button", { name: "Check axes" }).tap();
    await p
      .getByRole("status")
      .getByText(/atomic number belongs on x/)
      .waitFor();
    await p.getByLabel("Horizontal axis (x)").selectOption("number");
    await p.getByLabel("Vertical axis (y)").selectOption("radius");
    await p.getByRole("button", { name: "Check axes" }).tap();
    await p.getByLabel("Vertical coordinate: radius (pm)").fill("3");
    await p.getByRole("button", { name: "Plot point" }).tap();
    await p
      .getByRole("status")
      .getByText(/horizontal axis/)
      .waitFor();
    for (const [z, r] of [
      [3, 170],
      [10, 60],
      [11, 210],
    ]) {
      await p.getByLabel("Element to plot").selectOption(String(z));
      await p.getByLabel("Vertical coordinate: radius (pm)").fill(String(r));
      await p.getByRole("button", { name: "Plot point" }).tap();
      if (z === 3) {
        await p.reload();
        await p
          .getByRole("img", { name: /1 student-plotted points/ })
          .waitFor();
      }
    }
    await p
      .getByRole("button", { name: "Reveal the full reference pattern" })
      .tap();
    await p
      .getByRole("img", { name: /Full reference pattern revealed/ })
      .waitFor();
    await p.reload();
    await p
      .getByRole("img", { name: /Full reference pattern revealed/ })
      .waitFor();
    for (const width of [320, 390, 768, 1440]) {
      await p.setViewportSize({ width, height: 1000 });
      assert.ok(
        await p.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      );
    }
    await p.screenshot({
      path: "atomic-radius-graph-check.png",
      fullPage: true,
    });
    await p.getByRole("button", { name: "Interpret your graph" }).click();
    for (const value of ["axes", "pull", "level"]) {
      await p.locator(`input[value="${value}"]`).check();
      await p.getByRole("button", { name: "Check answer" }).click();
      await p.getByRole("button", { name: "Continue →", exact: true }).click();
    }
    await p
      .getByRole("heading", { name: "You’ve connected the pieces." })
      .waitFor();
    assert.equal(
      await p
        .getByRole("progressbar", { name: "Topic mastery" })
        .getAttribute("value"),
      "100",
    );
    await p
      .getByRole("link", { name: "Back to the atomic-radius path" })
      .click();
    await p.reload();
    await p.getByText("6 of 6 steps complete", { exact: true }).waitFor();
    assert.deepEqual(errors, []);
    console.log(
      "PASS: axes diagnosis, plotted coordinates, targeted feedback, saved axes/points/reference, graph interpretation, mastery, touch, responsive layout, no console errors.",
    );
  } finally {
    await b.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
