import { expect, Locator, Page } from '@playwright/test';
import { Cart } from './Cart.po';

export class TopBar {
    readonly page: Page
    readonly cartLink: Locator

    constructor(page: Page) {
        this.page = page
        this.cartLink = page.locator('.shopping_cart_link')
    }

    async openCart(): Promise<Cart> {
        await this.cartLink.click()
        return new Cart(this.page)
    }
}