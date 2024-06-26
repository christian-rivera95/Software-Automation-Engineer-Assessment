import { test } from '@playwright/test';
import { loginPositive, loginNegative } from './login';
import { correct, incorrectUsr, incorrectPwd } from './variables';



test('Positive-Test', async ({ page }) => {
  await loginPositive(page, correct.username, correct.password);
});

test('NegativeUser-Test', async ({ page }) => {
  await loginNegative(page, incorrectUsr.username, correct.password); 
    
});

test('NegativePwd-Test', async ({ page }) => {
  await loginNegative(page, correct.username, incorrectPwd.password);
});
