import { Locator, Page } from '@playwright/test';
import { CheckoutComplete } from './CheckoutComplete.po';

export class CheckoutOverview {
    readonly page: Page
    readonly cardInformationValue: Locator
    readonly shippingInformationValue: Locator
    readonly summarySubtotal: Locator
    readonly summaryTax: Locator
    readonly summaryTotal: Locator
    readonly finishButton: Locator

    constructor(page: Page) {
        this.page = page
        this.cardInformationValue = page.locator('.summary_info > .summary_value_label', {hasText: 'SauceCard #31337'})
        this.shippingInformationValue = page.locator('.summary_info > .summary_value_label', {hasText: 'FREE PONY EXPRESS DELIVERY!'})
        this.summarySubtotal = page.locator('.summary_subtotal_label')
        this.summaryTotal = page.locator('.summary_total_label')
        this.summaryTax = page.locator('.summary_tax_label')
        this.finishButton = page.getByTestId('finish')
    }

    async finishCheckout(): Promise<CheckoutComplete> {
        await this.finishButton.click()
        return new CheckoutComplete(this.page)
    }
}