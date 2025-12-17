import { expect, Page, Locator } from "@playwright/test";

export class Header {

    readonly page: Page;
    readonly logoLink: Locator;
    readonly logoImg: Locator;
    readonly searchInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logoLink = page.locator('a.header__heading-link');
        this.logoImg = page.locator('img.header__heading-logo');
        this.searchInput = page.locator('#Search-In-Inline');
    }

    async logoCheck() {
        await expect(this.logoLink).toBeVisible();
        await expect(this.logoLink).toHaveAttribute('href', '/');

        await expect(this.logoImg).toBeVisible();
        await expect(this.logoImg).toHaveAttribute('alt', 'The Connected Shop');
        await expect(this.logoImg).toHaveAttribute('width', '180');
        await expect(this.logoImg).toHaveAttribute('height', '90.0');
    }

    async logoClick() {
        await this.logoLink.click();
        await expect(this.page).toHaveURL('/');
    }

    async searchVisibility(placeholder: string) {
        await expect(this.searchInput).toBeVisible();
        await expect(this.searchInput).toBeEnabled();
        await expect(this.searchInput).toBeEditable();
        await expect(this.searchInput).toHaveAttribute('placeholder', placeholder);
    }

    async contactPhoneAndIcon() {
        //few classes in locator
        const contactNumber = this.page.locator('a.header__customer-support-region.link--text');
        await expect(contactNumber).toBeVisible();
        await expect(contactNumber).toHaveAttribute('href', 'tel:(305) 330-3424');

        //path with div in locator
        const contactIcon = this.page.locator('div.header__icons svg.icon-support-region');
        await expect(contactIcon).toBeVisible();
        await expect(contactIcon).toHaveAttribute('role', 'presentation');
    }

    async profileLinkAndIcon() {
        const profileLink = this.page.locator('div.header__icons a.header__icon--account');
        await expect(profileLink).toBeVisible();
        await expect(profileLink).toHaveAttribute('href', /https:\/\/theconnectedshop\.com\/customer_authentication\/redirect\?locale=en&region_country=.*/gm);

        const profileIcon = this.page.locator('div.header__icons svg.icon-account');
        await expect(profileIcon).toBeVisible();
        await expect(profileIcon).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
    }

    async cartCard() {
        const ShoppingBagIcon = this.page.locator('div.header__icons div.header__cart-inner svg.icon-cart');
        await expect(ShoppingBagIcon).toBeVisible();
        await expect(ShoppingBagIcon).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');

        //check text of element
        const ShoppingBagIconCounter = this.page.locator('div.header__icons div.header__cart-inner div.cart-count-bubble');
        await expect(ShoppingBagIconCounter).toBeVisible();
        await expect(ShoppingBagIconCounter).toContainText('0');

        //check text of element with toHaveText (???)
        const shoppingCartSubtotal = this.page.locator('div.header__icons div.header__cart-total span.header__cart-total__label');
        await expect(shoppingCartSubtotal).toBeVisible();
        await expect(shoppingCartSubtotal).toHaveText('Subtotal');

        const shoppingCartPrice = this.page.locator('div.header__icons div.header__cart-total span.header__cart-total__price');
        await expect(shoppingCartPrice).toBeVisible();
        //await expect(shoppingCartPrice).toHaveText('₴0.00');
    }

    async shoppingCartClick() {
        //page scroll to make header appears
        await this.page.mouse.wheel(0, 500);
        await this.page.locator('#cart-icon-bubble').click();
        await this.page.locator('#CartDrawer-ViewCart').click();
        await expect(this.page).toHaveURL('/cart');
    }





}