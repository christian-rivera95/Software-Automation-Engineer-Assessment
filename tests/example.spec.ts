import { test, expect } from '@playwright/test';

test('should login when clicking submit', async ({ page }) => {
  try {
    // Open login page
    await page.goto('https://practicetestautomation.com/practice-test-login/');

    // Enter the username "student" into the Username field
    await page.locator('#username').fill('student');

    // Enter the password "Password123" into the Password field.
    await page.locator('#password').fill('Password123');

    // Click the Submit button.
    await page.locator('#submit').click();

    // Check login
    await expect(page).toHaveURL(/.*logged-in-successfully/);
    await expect(page.getByText('Congratulations')).toBeVisible();
    await expect(page.getByText('successfully logged in')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
  } catch (error) {
    console.error(error);
  }

});

test('should verify that an error message is displayed for an invalid username.', async ({ page }) => {
  try {
    // Open the login page.
    await page.goto('https://practicetestautomation.com/practice-test-login/');

    // Enter an incorrect username into the Username field.
    await page.locator('#username').fill('teacher');

    // Enter the password "Password123" into the Password field.
    await page.locator('#password').fill('Password123');

    // Click the Submit button.
    await page.locator('#submit').click();

    // Check invalid username
    await expect(page.locator('#error')).toHaveText('Your username is invalid!');
  } catch (error) {
    console.error(error);
  }

});

test('should verify that an error message is displayed for an invalid password', async ({ page }) => {
  try {
    // Open the login page.
    await page.goto('https://practicetestautomation.com/practice-test-login/');

    // Enter the username "student" into the Username field.
    await page.locator('#username').fill('student');

    // Enter an incorrect password into the Password field.
    await page.locator('#password').fill('123');

    // Click the Submit button.
    await page.locator('#submit').click();

    // Check invalid password
    await expect(page.locator('#error')).toHaveText('Your password is invalid!');
  } catch (error) {
    console.error(error);
  }

});