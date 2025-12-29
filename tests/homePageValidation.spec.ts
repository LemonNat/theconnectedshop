import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { Header } from '../pages/Header';
import { Search } from '../pages/Search';
import { clickElement, fillElement } from '../utils/GlobalMethods';
import { HOME_PAGE } from '../utils/Constants/Page';
import { SEARCH_QUERIES, SEARCH_TEXTS } from '../utils/Constants/Search';
//import page_data from '../utils/Data_JSON/page_data.json';





test.describe('Check Home elements', () => {

    let basePage: BasePage;
    let header: Header;
    let search: Search;
    let badSearch: Search;


    test.beforeEach(async ({ page }) => {
        basePage = new BasePage(page);
        header = new Header(page);
        search = new Search(page, SEARCH_QUERIES.valid);
        badSearch = new Search(page, SEARCH_QUERIES.invalid);

        await basePage.goto();
        await basePage.waitForUrlContains();
    });


    test.describe('check Header elements', () => {

        test('check Header logo', async () => {
            await basePage.welcomePopupClose();
            await header.logoCheck();
            await clickElement(header.logoLink, 'Logo link');
            await basePage.waitForUrlContains();
        });

        test('url and title check', async () => {
            await basePage.titleCheck(HOME_PAGE.title);
            //title from json
            //await basePage.titleCheck(page_data.homePage.title);
            await basePage.waitForUrlContains();
        });

        test('search is visible', async () => {
            await header.checkSearchFieldIsVisible(SEARCH_TEXTS.SearchPlaceholder);
        });

        test('check contact phone and icon', async () => {
            await header.checkContactPhoneAndIcon();
        });

        test('profile link and icon', async () => {
            await header.checkProfileLinkAndIcon();
        });

        test('shopping cart card', async () => {
            await header.checkShoppingCartIcon();
        })

    })


    test.describe('Search functionality', () => {

        test('Search existing item', async () => {
            await header.checkSearchFieldIsVisible(SEARCH_TEXTS.SearchPlaceholder);
            await fillElement(header.searchInput, SEARCH_QUERIES.valid, 'Search query');
            await search.goToResultPage();
            await search.ResultsCounterPresent();
            await search.FirstResultCheck();
        });

        test('Search not existing item', async () => {
            await header.checkSearchFieldIsVisible(SEARCH_TEXTS.SearchPlaceholder);
            await fillElement(header.searchInput, SEARCH_QUERIES.invalid, 'Bad search query');
            await badSearch.goToResultPage();
            await badSearch.NoResultPlaceholderCheck();
        });

        test('Search and add to shopping cart', async () => {
            await basePage.welcomePopupClose();
            await header.checkSearchFieldIsVisible(SEARCH_TEXTS.SearchPlaceholder);
            await fillElement(header.searchInput, SEARCH_QUERIES.valid, 'Search query');

            await search.goToResultPage();
            await basePage.TimeOut(5000);
            await basePage.welcomePopupClose();
            await search.ResultsCounterPresent();
            await search.FirstResultCheck();

            await search.AddProductToCart(0);
            await search.AddProductToCart(1);

            await header.shoppingCartClick();
            await basePage.checkShoppingCartPageElements(SEARCH_QUERIES.valid);
            await basePage.shoppingCartCalculateTotal();
        })

    })


})