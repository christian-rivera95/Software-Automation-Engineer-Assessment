import { test, expect } from "@playwright/test";

test("Positive Login test case", async ({ page }) => {
  await page.goto("https://practicetestautomation.com/practice-test-login/");
  await page.fill("input#username", "student");
  await page.fill("input#password", "Password123");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.locator("h1")).toContainText("Successfully");
  await expect(page.locator("strong")).toContainText("Congratulations");

  await expect(page.locator('a:has-text("Log out")')).toBeVisible();
});

test("Negative Username test case", async ({ page }) => {
  await page.goto("https://practicetestautomation.com/practice-test-login/");
  await page.fill("input#username", "johnDoe");
  await page.fill("input#password", "Password123");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.locator("div#error")).toContainText(
    "Your username is invalid!"
  );
});
