import { Locator } from '@playwright/test';
import { Page } from 'playwright';

class LoginPage {
  private page: Page;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private submitButton: Locator;
  private successMessage: Locator;
  private errorMessage: Locator;
  private logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('//input[@id="username"]');
    this.passwordInput = page.locator('//input[@id="password"]');
    this.submitButton = page.locator('//button[@id="submit"]');
    this.successMessage = page.locator('//div[@id="loop-container"]/div/article/div[2]/p/strong');
    this.errorMessage = page.locator('//div[@id="error"]');
    this.logoutButton = page.locator('//div[@id="loop-container"]/div/article/div[2]/div/div/div/a');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://practicetestautomation.com/practice-test-login/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async getErrorMessage(): Promise<string | null> {
    return this.errorMessage.textContent();
  }

  async isLogoutButtonVisible(): Promise<boolean> {
    return this.logoutButton.isVisible();
  }

  async getSuccessMessage(): Promise<string | null> {
    return this.successMessage.textContent();
  }
}

export default LoginPage;
