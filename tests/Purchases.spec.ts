import { expect, test } from '@playwright/test';
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
})