/**
 * Temporary responsive-verification harness for the admin panel.
 * Loads /admin at 320 / 375 / 768 / 1280 and reports layout metrics.
 * Run: node e2e/responsive-check.mjs
 */
import { chromium } from "@playwright/test";

const WIDTHS = [320, 375, 768, 1280];
const BASE = "http://localhost:5173";

const browser = await chromium.launch();

for (const width of WIDTHS) {
  const page = await browser.newPage({ viewport: { width, height: 740 } });
  await page.goto(`${BASE}/admin`, { waitUntil: "networkidle" });

  // Sign in through the real UI when the demo gate is showing.
  if (await page.locator(".admin-login__card").count()) {
    await page.screenshot({ path: `test-results/admin-login-${width}.png` });
    await page.fill("input[type=password]", "admin123");
    await page.click("button[type=submit]");
  }

  await page.waitForSelector(".admin-chart", { timeout: 10000 });

  const metrics = await page.evaluate(() => {
    const doc = document.documentElement;
    const chart = document.querySelector(".admin-chart");
    const scroller = chart?.querySelector(".admin-chart__scroller");
    const title = document.querySelector(".admin-topbar__title");
    const burger = document.querySelector(".admin-hamburger");
    const stats = [...document.querySelectorAll(".admin-grid--stats .admin-stat")];
    const statTop = stats.map((s) => Math.round(s.getBoundingClientRect().top));
    const statRows = new Set(statTop).size;
    const baseline = (() => {
      const cols = chart?.querySelector(".admin-chart__cols");
      if (!cols) return null;
      return Math.round(cols.getBoundingClientRect().bottom - 22);
    })();
    const barBottoms = [...new Set(
      [...chart.querySelectorAll(".admin-chart__bar")].map(
        (b) => Math.round(b.getBoundingClientRect().bottom) - baseline
      )
    )];
    return {
      docOverflowX: doc.scrollWidth - doc.clientWidth,
      burgerVisible: getComputedStyle(burger).display !== "none",
      titleTruncated: title.scrollWidth > title.clientWidth,
      statRows,
      chartCols: chart.querySelectorAll(".admin-chart__col").length,
      chartScrolls: scroller ? scroller.scrollWidth - scroller.clientWidth : null,
      barBottomOffsets: barBottoms,
      axisLabels: [...chart.querySelectorAll(".admin-chart__axis span")].map((s) => s.textContent),
    };
  });

  await page.screenshot({ path: `test-results/admin-${width}.png`, fullPage: false });
  console.log(`\n=== ${width}px ===`);
  console.log(JSON.stringify(metrics, null, 2));
  await page.close();
}

await browser.close();
console.log("\nDone.");
