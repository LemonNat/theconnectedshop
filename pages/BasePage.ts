import { Page, expect } from '@playwright/test';
import { clickElement, isVisible } from '../utils/GlobalMethods';

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


    async welcomePopupClose() {
        if (await this.page.locator('#km-chat-login-modal').isVisible()) {
            await clickElement(this.page.locator('#km-chat-login-modal').contentFrame().locator('#km-chat-login-modal #km-modal-close'), 'Close Welcome popup');
        }
    }

    async checkShoppingCartPageElements(value: string) {
        //Checking page
        await expect(this.page).toHaveURL('/cart');
        await isVisible(this.page.locator('div.page-title__text-wrapper').getByText('Your cart'), 'You cart title');

        //Checking product section
        await isVisible(this.page.locator('#cart').getByText('Product'), 'Product title in the table');
        await isVisible(this.page.locator('#cart th').getByText('Quantity'), 'Quantity title in the table');
        await isVisible(this.page.locator('#cart th.small-hide').getByText('Total'), 'Total title in the table');
        //Checking product we are looking for is visible on page
        await isVisible(this.page.locator('#cart a.cart-item__name.h4').getByText(value), 'Product we are looking for is visible on page');

        //Cart totals section
        await isVisible(this.page.locator('#main-cart-footer'), 'Cart totals section');
        await isVisible(this.page.locator('#main-cart-footer').getByText('Subtotal'), 'Subtotal in Cart totals section');
        const subtotalAmount = this.page.locator('#main-cart-footer p.totals__subtotal-value');
        await isVisible(subtotalAmount, 'Subtotal amount in Cart totals section');
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