import { expect, Locator, Page } from '@playwright/test';
import { CheckoutOverview } from './CheckoutOverview.po';

export class Checkout {
    readonly page: Page
    readonly firstName: Locator
    readonly lastName: Locator
    readonly postalCode: Locator
    readonly continueButton: Locator
    readonly errorDetails: Locator

    constructor(page: Page) {
        this.page = page
        this.firstName = page.getByTestId('firstName')
        this.lastName = page.getByTestId('lastName')
        this.postalCode = page.getByTestId('postalCode')
        this.continueButton = page.getByTestId('continue')
        this.errorDetails = page.getByTestId('error')
    }

    async showOverview(): Promise<CheckoutOverview> {
        await this.continueButton.click()
        return new CheckoutOverview(this.page)
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/checkout-step-one.html')
        await expect(this.firstName).toBeVisible()
    }
}