import { test, expect } from "@playwright/test";

class LoginPage {
  constructor(private page: any) {}

  async open() {
    await this.page.goto(
      "https://practicetestautomation.com/practice-test-login/"
    );
  }

  async login(username: string, password: string) {
    await this.page.fill("input#username", username);
    await this.page.fill("input#password", password);
    await this.page.getByRole("button", { name: "Submit" }).click();
  }

  async isLoggedIn() {
    return await this.page.locator('a:has-text("Log out")').isVisible();
  }

  async getSuccessMessage() {
    return await this.page.locator("h1").innerText();
  }

  async getCongratulationsMessage() {
    return await this.page.locator("strong").innerText();
  }

  async getErrorMessage() {
    return await this.page.locator("div#error").innerText();
  }
}

test("Positive Login test case", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login("student", "Password123");

  await expect(await loginPage.getSuccessMessage()).toContain("Successfully");
  await expect(await loginPage.getCongratulationsMessage()).toContain(
    "Congratulations"
  );
  await expect(await loginPage.isLoggedIn()).toBe(true);
});

test("Negative Username test case", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login("johnDoe", "Password123");

  await expect(await loginPage.getErrorMessage()).toContain(
    "Your username is invalid!"
  );
});

test("Negative Password test case", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login("student", "123");

  await expect(await loginPage.getErrorMessage()).toContain(
    "Your password is invalid!"
  );
});
