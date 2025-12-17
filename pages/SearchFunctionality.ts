import { Page, expect, Locator } from '@playwright/test';


export class SearchFunctionality {

    readonly page: Page;
    readonly searchField: Locator;


    constructor(page: Page) {
        this.page = page;

        this.searchField = page.locator('#Search-In-Inline');

    }

    async searchAppearance() {
        await expect(this.searchField).toBeVisible();
    }

    async searchFill(value: string) {
        await this.searchField.fill(value);
        await expect(this.searchField).toHaveValue(value);

    }

    async searchGoToResult(value: string) {
        const suggestionText = `Search for “${value}”`;
        const suggestion = this.page.getByRole('option', { name: suggestionText });
        await expect(suggestion).toBeVisible();

        await suggestion.click();
        await expect(this.page).toHaveURL(new RegExp(value.replace(/ /g, '\\+')));
        await expect(this.page.getByText('Search results')).toBeVisible();
        await expect(this.page.locator('#Search-In-Template')).toBeVisible();
        await expect(this.page.locator('#Search-In-Template')).toHaveAttribute('value', value);
    }

    async searchResultsCounterPresent() {
        const searchResultCounter = this.page.locator('#ProductCount');
        //toHaveText with approximate value
        await expect(searchResultCounter).toHaveText(/.* results/);
    }
   async searchNoResult(value: string) {
        await expect(this.page.getByText(`No results found for “${value}”. Check the spelling or use a different word or phrase.`)).toBeVisible();
    }
    

    async searchFirstResultCheck(value: string) {
        const firstResult = this.page.locator('#ProductGridContainer ul.product-grid li').nth(0).locator('span.card__heading__product-title');
        await expect(firstResult).toBeVisible();
        await expect(firstResult).toHaveText(value);
    }
 
    async searchAddProductToCart(value: string, n: number) {
        const result = this.page.locator('#ProductGridContainer ul.product-grid li.grid__item').nth(n).locator('span.card__heading__product-title');
        await expect(result).toBeVisible();

        //click on Add btn
        await result.hover();
        await this.page.locator('#ProductGridContainer ul.product-grid li.grid__item').nth(n).locator('div.card__quick-buttons button.quick-add__submit').click();

        //proceed with popups
        await expect(this.page.locator('#QuickAddDrawer')).toBeVisible();
        await this.page.locator('#QuickAddDrawer button.product-form__submit').click();
        await this.page.waitForTimeout(5000);
        await expect(this.page.locator('#CartDrawer')).toBeVisible();
        await this.page.locator('#CartDrawer button.drawer__close').click();
    }
}