import { Page, Locator } from '@playwright/test';
import loginLocators from '../locators/loginLocators';

export class LoginPage {
    private page: Page;
    userNameInput: Locator;
    passwordInput: Locator;
    submitBtn: Locator;
    errorBox: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userNameInput = page.locator(loginLocators.userNameInput);
        this.passwordInput = page.locator(loginLocators.passwordInput);
        this.submitBtn = page.locator(loginLocators.submitBtn);
        this.errorBox = page.locator(loginLocators.errorBox);
    }

    async signIn(username: string, psswd: string): Promise<void> {
        await this.userNameInput.fill(username)
        await this.passwordInput.fill(psswd)
        await this.submitBtn.click();
    }
}