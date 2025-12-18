import { Page, expect, Locator } from '@playwright/test';
import { clickElement, isVisible } from '../utils/GlobalMethods';


export class Search {

    readonly page: Page;
    readonly searchResultCounter: Locator;
    readonly searchNoResultsPlaceholder: Locator;
    readonly searchQuery: string;
    
    

    constructor(page: Page, searchQuery: string) {
        this.page = page;
        this.searchQuery = searchQuery;

        this.searchResultCounter = this.page.locator('#ProductCount');
        this.searchNoResultsPlaceholder = this.page.getByText(`No results found for “${searchQuery}”. Check the spelling or use a different word or phrase.`)

    }



    async goToResultPage() {
        const suggestionText = `Search for “${this.searchQuery}”`;
        const suggestion = this.page.getByRole('option', { name: suggestionText });
        await isVisible(suggestion, 'Enterd text presents in search sugessions');

        await clickElement(suggestion, 'search result');
        await expect(this.page).toHaveURL(new RegExp(this.searchQuery.replace(/ /g, '\\+')));
        await isVisible(this.page.getByText('Search results'), 'Search result title');
        await isVisible(this.page.locator('#Search-In-Template'), 'Search input field');
        await expect(this.page.locator('#Search-In-Template')).toHaveAttribute('value', this.searchQuery);
    }

    async ResultsCounterPresent() {
        //toHaveText with approximate value
        await expect(this.searchResultCounter).toHaveText(/.* results/);
    }

    async NoResultPlaceholderCheck() {
        await isVisible(this.searchNoResultsPlaceholder, 'No search results text');
    }


    async FirstResultCheck() {
        const firstResult = this.page.locator('#ProductGridContainer ul.product-grid li').nth(0).locator('span.card__heading__product-title');
        await isVisible(firstResult, 'First product is the one we are looking for');
        await expect(firstResult).toContainText(this.searchQuery);
    }

    async AddProductToCart(n: number) {
        const result = this.page.locator('#ProductGridContainer ul.product-grid li.grid__item').nth(n).locator('span.card__heading__product-title');
        await isVisible(result, 'Some product');

        //click on Add btn
        await result.hover();
        const addButton = this.page.locator('#ProductGridContainer ul.product-grid li.grid__item').nth(n).locator('div.card__quick-buttons button.quick-add__submit');
        await clickElement(addButton, 'add button on product card');

        //proceed with popups
        await isVisible(this.page.locator('#QuickAddDrawer'), 'Choose options popup');
        await clickElement(this.page.locator('#QuickAddDrawer button.product-form__submit'), 'Add button on Choose option popup');

        //wait for locator (second popup)
        await this.page.waitForSelector('#CartDrawer', {state: 'visible'});
        await clickElement(this.page.locator('#CartDrawer button.drawer__close'), 'Close Your cart popup');
    }
}