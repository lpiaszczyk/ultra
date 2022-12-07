import { Locator, Page } from '@playwright/test';
import { CheckoutOverview } from './CheckoutOverview.po';

export class Checkout {
    readonly page: Page
    readonly firstName: Locator
    readonly lastName: Locator
    readonly postalCode: Locator
    readonly continueButton: Locator

    constructor(page: Page) {
        this.page = page
        this.firstName = page.getByTestId('firstName')
        this.lastName = page.getByTestId('lastName')
        this.postalCode = page.getByTestId('postalCode')
        this.continueButton = page.getByTestId('continue')
    }

    async showOverview(): Promise<CheckoutOverview> {
        await this.continueButton.click()
        return new CheckoutOverview(this.page)
    }
}