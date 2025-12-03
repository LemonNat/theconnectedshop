import { test, expect } from '@playwright/test';
import { beforeEach } from 'node:test';

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });


test.describe ('check home page elements', () => {

    test.describe ('check header elements', () => {
    test.beforeEach (async ({page}) => {
        await page.goto('/');
    }); 

    test ('check title and url', async ({page}) => {
        await expect(page).toHaveURL('/');
        await expect(page).toHaveTitle('The Connected Shop - Smart Locks, Smart Sensors, Smart Home & Office');
        
    });

    test ('check logo', async ({page}) => {
        const logoLink = page.locator ('a.header__heading-link');
        await expect(logoLink).toBeVisible();
        await expect(logoLink).toHaveAttribute('href', '/');
        
        const logoLogo = page.locator ('img.header__heading-logo');
        await expect(logoLogo).toBeVisible();
        await expect(logoLogo).toHaveAttribute('alt', 'The Connected Shop');
        await expect(logoLogo).toHaveAttribute('width', '180');
        await expect(logoLogo).toHaveAttribute('height', '90.0');
        
        await logoLink.click();
        await expect(page).toHaveURL('/');

    });

    test ('search field visible', async ({page}) => {
        const searchInput = page.locator ('#Search-In-Inline');
        await expect(searchInput).toBeVisible();
        await expect(searchInput).toBeEnabled();
        await expect(searchInput).toBeEditable();
        await expect(searchInput).toHaveAttribute('placeholder', 'Search');
    });

    //HOMEWORK

    
    test ('check contact phone and icon', async ({page}) => {
        //few classes in locator
        const contactNumber = page.locator ('a.header__customer-support-region.link--text');
        await expect(contactNumber).toBeVisible();
        await expect(contactNumber).toHaveAttribute('href', 'tel:(305) 330-3424');

        //path with div in locator
        const contactIcon = page.locator ('div.header__icons svg.icon-support-region');
        await expect(contactIcon).toBeVisible();
        await expect(contactIcon).toHaveAttribute('role', 'presentation');
    });


    test ('profile link and icon', async({page}) => {
        const profileLink = page.locator ('div.header__icons a.header__icon--account');
        await expect(profileLink).toBeVisible();
        await expect(profileLink).toHaveAttribute('href', 'https://theconnectedshop.com/customer_authentication/redirect?locale=en&region_country=UA');

        const profileIcon = page.locator ('div.header__icons svg.icon-account');
        await expect(profileIcon).toBeVisible();
        await expect(profileIcon).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
    });


    test ('shopping cart icon', async({page}) => {
        const ShoppingBagIcon = page.locator('div.header__icons div.header__cart-inner svg.icon-cart');
        await expect(ShoppingBagIcon).toBeVisible();
        await expect(ShoppingBagIcon).toHaveAttribute('xmlns','http://www.w3.org/2000/svg');

        //check text of element
        const ShoppingBagIconCounter = page.locator('div.header__icons div.header__cart-inner div.cart-count-bubble');
        await expect(ShoppingBagIconCounter).toBeVisible();
        await expect(ShoppingBagIconCounter).toContainText('0');

        //check text of element with toHaveText (???)
        const shoppingCartSubtotal = page.locator('div.header__icons div.header__cart-total span.header__cart-total__label');
        await expect(shoppingCartSubtotal).toBeVisible();
        await expect(shoppingCartSubtotal).toHaveText('Subtotal');

        const shoppingCartPrice = page.locator('div.header__icons div.header__cart-total span.header__cart-total__price');
        await expect(shoppingCartPrice).toBeVisible();
        await expect(shoppingCartPrice).toHaveText('₴0.00');
    })
})

test.describe('check footer elements',() => {

    test.beforeEach (async ({page}) => {
        await page.goto('/');
    }); 

    test ('Our Story list elements check', async({page}) => {

      //  test.step.beforeEach (async ({page}) => {await page.goto('/');});

        await test.step('Check Our Story', async() =>{
        //go to footer-collapse-block and search inside by text
        const ourStory = page.locator('footer-collapse-block.footer-block--menu').getByText('Our Story');
        await expect(ourStory).toBeVisible();
        })

        await test.step('Check About Us', async() => {
        //go to list, select its item, and locate link from list item
        const aboutUs = page.locator('ul.footer-block__details-content.list-unstyled li').nth(0).locator('a');
        await expect(aboutUs).toBeVisible();
        await expect(aboutUs).toHaveAttribute('href','/pages/about-us');
        await aboutUs.click();
        await expect(page).toHaveURL('https://theconnectedshop.com/pages/about-us');
        await page.goto('/');
        })

        await test.step('Check Reviews', async() => {
        const Reviews = page.locator('ul.footer-block__details-content.list-unstyled li').nth(1).locator('a');
        await expect(Reviews).toBeVisible();
        await expect(Reviews).toHaveAttribute('href','/pages/reviews');
        })

        await test.step('Check Tech Talk', async() => {
        const TechTalk = page.locator('ul.footer-block__details-content.list-unstyled li').nth(2).locator('a');
        await expect(TechTalk).toBeVisible();
        await expect(TechTalk).toHaveAttribute('href','/blogs/tech-talk');
        })

        await test.step('Check Press', async() => {
        const Press = page.locator('ul.footer-block__details-content.list-unstyled li').nth(3).locator('a');
        await expect(Press).toBeVisible();
        await expect(Press).toHaveAttribute('href','/pages/press');
        })
    })

    test ('check BBB rating', async({page}) => {
        await expect(page.getByText('BBB Rating')).toBeVisible();

        const bbbRaitingLink = page.locator('footer-collapse-block').nth(1).locator('div.footer-block__details-content a');
        await expect(bbbRaitingLink).toBeVisible();
        await expect(bbbRaitingLink).toHaveAttribute('href','https://www.bbb.org/us/fl/miami-beach/profile/ecommerce/connected-shop-inc-0633-92025167/#sealclick');
    
        const bbbRaitingImg = page.getByAltText('Connected Shop Inc BBB Business Review');
        await expect(bbbRaitingImg).toBeVisible();
        await expect(bbbRaitingImg).toHaveAttribute('src', 'https://seal-seflorida.bbb.org/seals/black-seal-293-61-bbb-92025167.png');

    })



})
})