import { Page, Locator } from '@playwright/test';
import homeLocators from '../locators/homeLocators';

export class HomePage {
    private page: Page;
    logoutBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logoutBtn = page.locator(homeLocators.logoutBtn);
    }
}