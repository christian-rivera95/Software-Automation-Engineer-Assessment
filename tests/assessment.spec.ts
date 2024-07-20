import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { BasePage } from '../pages/basePage';


test('Positive Login Test', async ({ page }) => {
  const login = new LoginPage(page);
  const base = new BasePage(page);
  await base.loadWeb("https://practicetestautomation.com/practice-test-login/");
  await login.loginWithCorrectUser();
  await login.loginWithCorrectPassword();
  await login.clickLoginButton();
  await login.checkErrorMessageToBeHidden();
  await login.checkNewUrl();
  await login.checkTextInPage();
  await page.pause();
});


test('Negative Username Test', async ({ page }) => {
  const login = new LoginPage(page);
  const base = new BasePage(page);
  await base.loadWeb("https://practicetestautomation.com/practice-test-login/");
  await login.loginWithWrongUser();
  await login.loginWithCorrectPassword();
  await login.clickLoginButton();
  await login.checkErrorMessageToBeVisible();
  await login.checkTextErrorMessage();
  await page.pause();
});

test('Negative Password Test', async ({ page }) => {
  const login = new LoginPage(page);
  const base = new BasePage(page);
  await base.loadWeb("https://practicetestautomation.com/practice-test-login/");
  await login.loginWithWrongUser();
  await login.loginWithCorrectPassword();
  await login.clickLoginButton();
  await login.checkErrorMessageToBeVisible();
  await login.checkTextErrorMessage();
  await page.pause();
});