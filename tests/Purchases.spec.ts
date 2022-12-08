import { expect, test } from '@playwright/test';
import { Checkout } from './pageObjects/Checkout.po';
import { Inventory } from './pageObjects/Inventory.po';

test.describe('Purchases flow', () => {
    test('Can be completed with correct data', async ({page}) => {
        const inventoryPage = new Inventory(page)
        await inventoryPage.goto()
        await inventoryPage.addBackpackToCart()
        const cartPage = await inventoryPage.topBar.openCart()
        expect(cartPage.getListItemLocator('Sauce Labs Backpack')).toBeVisible()
        const checkoutPage = await cartPage.goToCheckout()
        await checkoutPage.firstName.fill('First')
        await checkoutPage.lastName.fill('Last')
        await checkoutPage.postalCode.fill('First')
        const checkoutOverviewPage = await checkoutPage.showOverview()
        await expect(checkoutOverviewPage.cardInformationValue).toBeVisible()
        await expect(checkoutOverviewPage.shippingInformationValue).toBeVisible()
        await expect(checkoutOverviewPage.summarySubtotal).toContainText('29.99')
        await expect(checkoutOverviewPage.summaryTax).toContainText('2.40') 
        await expect(checkoutOverviewPage.summaryTotal).toContainText('32.39')
        const checkoutFinishedPage = await checkoutOverviewPage.finishCheckout()
        await expect(checkoutFinishedPage.completeHeader).toBeVisible()
        await expect(checkoutFinishedPage.completeText).toBeVisible()
        await expect(checkoutFinishedPage.ponyExpressImage).toBeVisible()
    })

    test('Cannot be completed with empty postal data - First name', async ({page}) => {
        const checkoutPage = new Checkout(page)
        await checkoutPage.goto()
        await checkoutPage.lastName.fill('test')
        await checkoutPage.postalCode.fill('test')
        await checkoutPage.continueButton.click()

        await expect(checkoutPage.errorDetails).toContainText('Error: First Name is required')
    })

    test('Cannot be completed with empty postal data - Last name', async ({page}) => {
        const checkoutPage = new Checkout(page)
        await checkoutPage.goto()
        await checkoutPage.firstName.fill('test')
        await checkoutPage.postalCode.fill('test')
        await checkoutPage.continueButton.click()

        await expect(checkoutPage.errorDetails).toContainText('Error: Last Name is required')
    })

    test('Cannot be completed with empty postal data - Postal code', async ({page}) => {
        const checkoutPage = new Checkout(page)
        await checkoutPage.goto()
        await checkoutPage.firstName.fill('test')
        await checkoutPage.lastName.fill('test')
        await checkoutPage.continueButton.click()

        await expect(checkoutPage.errorDetails).toContainText('Error: Postal Code is required')
    })
})