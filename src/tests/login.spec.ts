import { test, expect } from '@playwright/test';
import LoginPage from '../pages/Login.page';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('1. Positive LogIn Test', async ({ page }) => {
    await loginPage.login('student', 'Password123');
    expect(page.url()).toContain('https://practicetestautomation.com/logged-in-successfully/');

    const successMessage = await loginPage.getSuccessMessage();
    expect(successMessage).toContain('Congratulations student. You successfully logged in!');

    const isLogoutButtonVisible = await loginPage.isLogoutButtonVisible();
    expect(isLogoutButtonVisible).toBe(true);
  });

  test('2. Negative Username Test', async ({ page }) => {
    await loginPage.login('invaliduser', 'Password123');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Your username is invalid!');
  });

  test('3. Negative Password Test', async ({ page }) => {
    await loginPage.login('student', 'invalidpassword');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Your password is invalid!');
  });
});
