import { expect, Locator, Page } from '@playwright/test';
import { TopBar } from './TopBar.po';

export class Inventory {
    readonly page: Page
    readonly header: Locator
    readonly backpackAddToCartButton: Locator
    readonly topBar: TopBar

    constructor(page: Page) {
        this.page = page
        this.header = page.locator('.title')
        this.backpackAddToCartButton = page.getByTestId('add-to-cart-sauce-labs-backpack')
        this.topBar = new TopBar(page)
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/inventory.html')
        await expect(this.header).toBeVisible()
    }

    async addBackpackToCart() {
        await this.backpackAddToCartButton.click()
    }
}