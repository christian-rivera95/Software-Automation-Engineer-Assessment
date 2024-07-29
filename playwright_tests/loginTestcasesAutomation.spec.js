import {test, expect} from "@playwright/test"

test('Test case 1: Positive LogIn test', async ({ page }) => {

    
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    await page.getByLabel('Username').click();
    await page.getByLabel('Username').fill('student');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('Password123');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.waitForURL ('https://practicetestautomation.com/logged-in-successfully/')
    await page.waitForSelector ('.post-title')

    const successMessage = await page.innerText('.post-title');
  if (successMessage.includes('Logged In Successfully')) {
    console.log('Positive Login Test Passed');
  } else {
    console.log('Positive Login Test Failed');
  }

  await page.getByRole('link', { name: 'Log out' }).click();

})

test('Test case 2: Negative username test', async ({ page }) => {

    
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    await page.getByLabel('Username').click();
    await page.getByLabel('Username').fill('incorrectUser');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('Password123');
    await page.getByRole('button', { name: 'Submit' }).click();

    const usernameErrorMessage = await page.innerText('#error');
  if (usernameErrorMessage.includes('Your username is invalid!')) {
    console.log('Negative Username Test Passed');
  } else {
    console.log('Negative Username Test Failed');
  }

})

test('Test case 3: Negative password test', async ({ page }) => {

    
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    await page.getByLabel('Username').click();
    await page.getByLabel('Username').fill('student');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('incorrectPassword');
    await page.getByRole('button', { name: 'Submit' }).click();

    const usernameErrorMessage = await page.innerText('#error');
  if (usernameErrorMessage.includes('Your password is invalid!')) {
    console.log('Negative Password Test Passed');
  } else {
    console.log('Negative Password Test Failed');
  }

})

;
