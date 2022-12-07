import { Locator, Page } from '@playwright/test';
import { Checkout } from './Checkout.po';

export class Cart {
    readonly page: Page
    readonly checkoutButton: Locator

    constructor(page: Page) {
        this.page = page
        this.checkoutButton = page.getByTestId('checkout')
    }

    getListItemLocator(itemName: string): Locator {
        return this.page.locator('.inventory_item_name', { hasText: itemName })
    }

    async goToCheckout(): Promise<Checkout> {
        await this.checkoutButton.click()
        return new Checkout(this.page)
    }
}