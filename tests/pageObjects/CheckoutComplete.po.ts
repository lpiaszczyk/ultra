import { Locator, Page } from '@playwright/test';

export class CheckoutComplete {
    readonly page: Page
    readonly ponyExpressImage: Locator
    readonly completeHeader: Locator
    readonly completeText: Locator

    constructor(page: Page) {
        this.page = page
        this.completeHeader = page.locator('.complete-header')
        this.completeText = page.locator('.complete-text')
        this.ponyExpressImage = page.getByAltText('Pony Express')
    }
}