import { expect, Page, Locator } from "@playwright/test";
import { clickElement, isVisible } from "../utils/GlobalMethods";

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
        await isVisible(this.logoLink, 'Logo link');
        await expect(this.logoLink).toHaveAttribute('href', '/');

        await isVisible(this.logoImg, 'Logo picture');
        await expect(this.logoImg).toHaveAttribute('alt', 'The Connected Shop');
        await expect(this.logoImg).toHaveAttribute('width', '180');
        await expect(this.logoImg).toHaveAttribute('height', '90.0');
    }

    async checkSearchFieldIsVisible(placeholder: string) {
        await isVisible(this.searchInput, 'Search field');
        await expect(this.searchInput).toBeEnabled();
        await expect(this.searchInput).toBeEditable();
        await expect(this.searchInput).toHaveAttribute('placeholder', placeholder);
    }

    async checkContactPhoneAndIcon() {
        //few classes in locator
        const contactNumber = this.page.locator('a.header__customer-support-region.link--text');
        await isVisible(contactNumber, 'Contact phone number');
        await expect(contactNumber).toHaveAttribute('href', 'tel:(305) 330-3424');

        //path with div in locator
        const contactIcon = this.page.locator('div.header__icons svg.icon-support-region');
        await isVisible(contactIcon, 'Contact icon');
        await expect(contactIcon).toHaveAttribute('role', 'presentation');
    }

    async checkProfileLinkAndIcon() {
        const profileLink = this.page.locator('div.header__icons a.header__icon--account');
        await isVisible(profileLink, 'Profile link');
        await expect(profileLink).toHaveAttribute('href', /https:\/\/theconnectedshop\.com\/customer_authentication\/redirect\?locale=en&region_country=.*/gm);

        const profileIcon = this.page.locator('div.header__icons svg.icon-account');
        await isVisible(profileIcon, 'Profile icon');
        await expect(profileIcon).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
    }

    async checkShoppingCartIcon() {
        const ShoppingBagIcon = this.page.locator('div.header__icons div.header__cart-inner svg.icon-cart');
        await isVisible(ShoppingBagIcon, 'Shopping bag icon');
        await expect(ShoppingBagIcon).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');

        //check text of element with toContainText
        const ShoppingBagIconCounter = this.page.locator('div.header__icons div.header__cart-inner div.cart-count-bubble');
        await isVisible(ShoppingBagIconCounter, 'Shopping bag counter');
        await expect(ShoppingBagIconCounter).toContainText('0');

        //check text of element with toHaveText
        const shoppingCartSubtotal = this.page.locator('div.header__icons div.header__cart-total span.header__cart-total__label');
        await isVisible(shoppingCartSubtotal, 'Shopping cart subtotal text');
        await expect(shoppingCartSubtotal).toHaveText('Subtotal');

        const shoppingCartPrice = this.page.locator('div.header__icons div.header__cart-total span.header__cart-total__price');
        await isVisible(shoppingCartPrice, 'Shopping cart subtotal price');
    }

    async shoppingCartClick() {
        //page scroll to make header appears
        await this.page.mouse.wheel(0, 500);
        await clickElement(this.page.locator('#cart-icon-bubble'), 'Shopping Cart icon in header');
        await clickElement(this.page.locator('#CartDrawer-ViewCart'), 'View Cart button on You cart popup');
        await expect(this.page).toHaveURL('/cart');
    }





}