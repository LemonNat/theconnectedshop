import { test, expect } from '@playwright/test';
//import { faker } from '@faker-js/faker'; english as defalult
//import { faker } from '@faker-js/faker/locale/uk';
import { generateRandomEmail, generateRandomFullName, generateStrongPassword } from '../utils/GlobalMethods';


test.describe('Check finmore regestration form', () => {

    // //const personName = faker.person.fullName();
    // const personName = `${faker.person.firstName()} ${faker.person.lastName()}`;
    // const personEmail = faker.internet.email({ provider: 'gmail.com' }).toLowerCase();
    // //const personPassword = faker.internet.password({length:6});
    // const personPassword = faker.internet.password({
    //     length: 12,
    //     memorable: false,
    //     pattern: /[A-Za-z0-9!@#$%^&*]/,
    // });

    const personName = generateRandomFullName();
    const personEmail = generateRandomEmail();
    const personPassword = generateStrongPassword();
    

    test.beforeEach(async ({ page }) => {
        await page.goto('https://finmore.netlify.app/');
        await expect(page).toHaveURL('https://finmore.netlify.app/');
    });

    test('registration form', async ({ page }) => {
        //open registration page and check we are here
        await page.getByTestId('switch-to-register-button').click();
        await expect(page.getByTestId('register-title')).toBeVisible();

        //fill fields and click Submit btn
        await page.getByTestId('register-name-input').fill(personName);
        await expect(page.getByTestId('register-name-input')).toHaveValue(personName);
        console.log(personName);

        await page.getByTestId('register-email-input').fill(personEmail);
        await expect(page.getByTestId('register-email-input')).toHaveValue(personEmail);
        console.log(personEmail);

        await page.getByTestId('register-password-input').fill(personPassword);
        await expect(page.getByTestId('register-password-input')).toHaveValue(personPassword);
        console.log(personPassword);

        await page.getByTestId('register-confirm-password-input').fill(personPassword);
        await expect(page.getByTestId('register-confirm-password-input')).toHaveValue(personPassword);

        await page.getByTestId('register-submit-button').click();
        //check we are in
        await expect(page.getByText('Finance Manager')).toBeVisible();

    });


})