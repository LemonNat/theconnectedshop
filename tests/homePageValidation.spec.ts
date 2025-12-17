import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { Header } from '../pages/Header';
import { SearchFunctionality } from '../pages/searchFunctionality';


test.describe('Check Home elements', () => {

    let basePage: BasePage;
    let header: Header;
    let search: SearchFunctionality;

    const pageTitle = 'The Connected Shop - Smart Locks, Smart Sensors, Smart Home & Office';
    const query = 'Smart Door Lock Slim';
    const badQuery = 'sdfsfs';
    const headerSearchPlaceholder = 'Search';



    test.describe('check Header elements', () => {
        test.beforeEach(async ({ page }) => {
            basePage = new BasePage(page);
            header = new Header(page);
            search = new SearchFunctionality(page);

            await basePage.goto();
            await basePage.waitForUrlContains();
        });

        test('check Header logo', async () => {
            await basePage.welcomePopupClose();
            await header.logoCheck();
            await header.logoClick();
        });

        test('url and title check', async () => {
            await basePage.titleCheck(pageTitle);
            await basePage.urlCheck();
        });

        test('search is visible', async() => {
            await header.searchVisibility(headerSearchPlaceholder);
        });

        test('check contact phone and icon', async() => {
            await header.contactPhoneAndIcon();
        });

        test('profile link and icon', async() => {
            await header.profileLinkAndIcon();
        });

        test('shopping cart card', async() => {
            await header.cartCard();
        })


    })

    // test.describe('Search functionality', () => {
    //     test.beforeEach(async ({ page }) => {
    //         basePage = new BasePage(page);
    //         header = new Header(page);
    //         search = new SearchFunctionality(page);

    //         await basePage.goto();
    //         await basePage.waitForUrlContains();
    //     });

    //     test('Search existing item', async () => {
    //         await search.searchAppearance();
    //         await search.searchFill(query);
    //         await search.searchGoToResult(query);
    //         await search.searchResultsCounterPresent();
    //         await search.searchFirstResultCheck(query);
    //     });

    //     test('Search not existing item', async () => {
    //         await search.searchAppearance();
    //         await search.searchFill(badQuery);
    //         await search.searchGoToResult(badQuery);
    //         await search.searchNoResult(badQuery);
    //     });

    //     // test('Search and add to sopping cart', async ({ page }) => {
    //     //     await basePage.welcomePopupClose();
    //     //     await search.searchAppearance();
    //     //     await search.searchFill(query);
    //     //     await search.searchGoToResult(query);
    //     //     await basePage.welcomePopupClose();
    //     //     await search.searchResultsCounterPresent();
    //     //     await search.searchFirstResultCheck(query);
            
    //     //     await search.searchAddProductToCart(query, 0);
    //     //     await search.searchAddProductToCart(query, 1);

    //     //     await header.shoppingCartClick();
    //     //     await basePage.shoppingCartPage(query);
    //     //     await basePage.shoppingCartCalculateTotal();
    //     // })
    // })


})