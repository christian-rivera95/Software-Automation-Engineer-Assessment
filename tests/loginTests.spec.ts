import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';

test.describe('Login Tests', () => {

    test.beforeEach(async ({page}) => {
        await page.goto('https://practicetestautomation.com/practice-test-login/');
    })

    test('Positive LogIn Test - 10 points', async ({ page }) => {
        const loginPage = new LoginPage(page)
        const homePage = new HomePage(page)
        await loginPage.signIn('student','Password123')
      
        await expect(page).toHaveURL("https://practicetestautomation.com/logged-in-successfully/");
        await expect(page.getByText(/Congratulations|successfully logged in/)).toBeVisible()
        await expect(homePage.logoutBtn).toBeVisible();
    });
    
    
    test('Negative Username Test - 5 Points', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.signIn('studentaaa','Password123')
        
        
        await expect(loginPage.errorBox).toBeVisible()
        await expect(loginPage.errorBox).toContainText('Your username is invalid!')
        
    });
    
    test('Negative Password Test - 5 Points', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.signIn('student','Password1234')
      
    
        await expect(loginPage.errorBox).toBeVisible()
        await expect(loginPage.errorBox).toContainText('Your password is invalid!')
        
      });

})
