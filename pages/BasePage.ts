import { Page, expect } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(url: string = '/') {
        await this.page.goto(url);
    }

    async waitForUrlContains(text: string = '/') {
        await expect(this.page).toHaveURL(text);
    }

    async TimeOut(n: number) {
        await this.page.waitForTimeout(n);
    }

    async titleCheck(value: string) {
        await expect(this.page).toHaveTitle(value);
    }

    async urlCheck() {
        await expect(this.page).toHaveURL('/');

    }

    async welcomePopupClose() {
        await this.page.locator('#kommunicate-widget-iframe').contentFrame().locator('#km-chat-login-modal #km-modal-close').click();
    }

    async shoppingCartPage(value: string) {
        //Checking page
        await expect(this.page).toHaveURL('/cart');
        await expect(this.page.locator('div.page-title__text-wrapper').getByText('Your cart')).toBeVisible();

        //Checking product section
        await expect(this.page.locator('#cart').getByText('Product')).toBeVisible();
        await expect(this.page.locator('#cart th').getByText('Quantity')).toBeVisible();
        await expect(this.page.locator('#cart th.small-hide').getByText('Total')).toBeVisible();
        //Checking product we are looking for is visible on page
        await expect(this.page.locator('#cart a.cart-item__name.h4').getByText(value)).toBeVisible();

        //Cart totals section
        await expect(this.page.locator('#main-cart-footer')).toBeVisible();
        await expect(this.page.locator('#main-cart-footer').getByText('Subtotal')).toBeVisible();
        const subtotalAmount = this.page.locator('#main-cart-footer p.totals__subtotal-value');
        await expect(subtotalAmount).toBeVisible();
    }

    async shoppingCartCalculateTotal() {
        //calculate Subtotal
        var totalAmount: number = 0;

        //for will work for each items in array
        for (let cartItem of await this.page.locator('#cart tbody tr').all()) {
            //to get text inside of element
            let itemPrice = await cartItem.locator('td.cart-item__totals span.price').innerText();
            //convert string to number with replacing of some symbols
            let itemAmount: number = +itemPrice.replace('₴', '').replace(',', '');
            //increase total amount
            totalAmount += itemAmount;
        }
        
        //compare calculated total and exisitng one
        let SubtotalText = await this.page.locator('#main-cart-footer p.totals__subtotal-value').innerText();
        let SubtotalNumber: number = +SubtotalText.replace('₴', '').replace(',', '');
        await expect(totalAmount).toEqual(SubtotalNumber);
    }


}