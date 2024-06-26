import { Page, expect } from '@playwright/test';
import { correct, incorrectUsr, incorrectPwd } from './variables';

const LOGIN_URL = 'https://practicetestautomation.com/practice-test-login/';
const USERNAME_SELECTOR = '#username';
const PASSWORD_SELECTOR = '#password';
const ERROR_SELECTOR = '#error';
const SUCCESS_MESSAGE_SELECTOR = 'strong';


export async function loginPositive(page:Page, username: string, password:string): Promise<void>{
    await page.goto(LOGIN_URL);
    await page.waitForSelector(USERNAME_SELECTOR);
    await page.waitForSelector(PASSWORD_SELECTOR);
    await page.fill(USERNAME_SELECTOR, username);
    console.info('Fill user');
    await page.fill(PASSWORD_SELECTOR, password);
    console.info('Fill pwd');
    await page.getByRole('button', { name: 'Submit' }).click();
    console.info('Press Submit');
    await expect(page.locator(SUCCESS_MESSAGE_SELECTOR)).toHaveText(/Congratulations|successfully logged in/);
    console.info('Found Congratulations | successfully logged in');
    await expect(page.getByRole('link', {name:'Log out'})).toBeVisible();
    console.info('Log Out');
  
  }

  export async function loginNegative(page: Page, username: string, password: string): Promise<void> {
    await page.goto(LOGIN_URL);
    await page.waitForSelector(USERNAME_SELECTOR);
    await page.waitForSelector(PASSWORD_SELECTOR);
  
    await page.fill('#username', username);
    console.info('Fill user');
    await page.fill('#password', password);
    console.info('Fill pwd');
  
    await page.getByRole('button', { name: 'Submit' }).click();
    console.info('Press Submit');
    if(username === incorrectUsr.username) {
      await expect(page.locator(ERROR_SELECTOR)).toHaveText('Your username is invalid!');
      console.info('Incorrect username');
    }

    else if(password === incorrectPwd.password) {
      await expect(page.locator(ERROR_SELECTOR)).toHaveText('Your password is invalid!');
      console.info('Incorrect password');
    }

    else if (correct.username !== incorrectUsr.username && correct.password === incorrectPwd.password) {
      await expect(page.locator('#error')).toHaveText('Your username is invalid!');
      console.info('Incorrect username');
    }
}
