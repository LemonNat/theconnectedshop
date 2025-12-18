import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { Header } from '../pages/Header';
import { Search } from '../pages/Search';
import { clickElement, fillElement } from '../utils/GlobalMethods';





test.describe('Check Home elements', () => {

    let basePage: BasePage;
    let header: Header;
    let search: Search;
    let badSearch: Search;

    const pageTitle = 'The Connected Shop - Smart Locks, Smart Sensors, Smart Home & Office';
    const query = 'Smart Door Lock Slim';
    const badQuery = 'sdfsfs';
    const headerSearchPlaceholder = 'Search';

    test.beforeEach(async ({ page }) => {
        basePage = new BasePage(page);
        header = new Header(page);
        search = new Search(page, query);
        badSearch = new Search(page, badQuery);

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
            await basePage.titleCheck(pageTitle);
            await basePage.waitForUrlContains();
        });

        test('search is visible', async () => {
            await header.checkSearchFieldIsVisible(headerSearchPlaceholder);
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
            await header.checkSearchFieldIsVisible(headerSearchPlaceholder);
            await fillElement(header.searchInput, search.searchQuery, 'Search query');
            await search.goToResultPage();
            await search.ResultsCounterPresent();
            await search.FirstResultCheck();
        });

        test('Search not existing item', async () => {
            await header.checkSearchFieldIsVisible(headerSearchPlaceholder);
            await fillElement(header.searchInput, badSearch.searchQuery, 'Bad search query');
            await badSearch.goToResultPage();
            await badSearch.NoResultPlaceholderCheck();
        });

        test('Search and add to sopping cart', async () => {
            await basePage.welcomePopupClose();
            await header.checkSearchFieldIsVisible(headerSearchPlaceholder);
            await fillElement(header.searchInput, search.searchQuery, 'Search query');

            await search.goToResultPage();
            await basePage.TimeOut(5000);
            await basePage.welcomePopupClose();
            await search.ResultsCounterPresent();
            await search.FirstResultCheck();

            await search.AddProductToCart(0);
            await search.AddProductToCart(1);

            await header.shoppingCartClick();
            await basePage.shoppingCartPage(query);
            await basePage.shoppingCartCalculateTotal();
        })

    })


})