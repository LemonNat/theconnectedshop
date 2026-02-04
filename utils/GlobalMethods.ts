import { expect, Locator } from "@playwright/test";


export async function clickElement(locator: Locator, elementName: string) {
    try {
      console.log(`CLICK: ${elementName}`);
      await locator.click();
      console.log(`CLICK SUCCESS: ${elementName}`);
    } catch (error) {
      console.error(`CLICK FAILED: ${elementName}`);
      throw new Error(`Cannot click '${elementName}': ${error}`);
    }
  };
 
export async function fillElement(locator: Locator, value: string, name: string) {
  try {
    console.log(`FILL: ${name} -> "${value}"`);
    await locator.fill(value);
 
    const actual = await locator.inputValue();
    console.log(`FILL CHECK: ${name} VALUE = "${actual}"`);
  } catch (error) {
    throw new Error(`FILL FAILED: ${name}, VALUE="${value}"\n${error}`);
  }
};
 
export async function isVisible(locator: Locator, name: string) {
  try {
    console.log(`CHECK VISIBLE: ${name}`);
    await expect(locator).toBeVisible();
    console.log(`VISIBLE OK: ${name}`);
  } catch (error) {
    throw new Error(` NOT VISIBLE: ${name}\n${error}`);
  }
};

//randomizer for email
export const generateRandomEmail = (base: string = 'user', domain: string = 'necub.com') => {
  const randomNum = Math.floor(Math.random() * 100000); // 0-99999
  return `${base}+${randomNum}@${domain}`;
};
 
//randomizer for password
export const generateStrongPassword = (): string => {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const specials = '!@#$%^&*';
  const randomChar = (chars: string) => chars[Math.floor(Math.random() * chars.length)];
 
  return (
    randomChar(upper) +
    randomChar(lower) +
    randomChar(lower) +
    randomChar(numbers) +
    randomChar(numbers) +
    randomChar(specials) +
    randomChar(lower) +
    randomChar(upper)
  );
};

//randomizer for full name
const firstNames = ['Василь', 'Олександр', 'Іван', 'Марія', 'Анна', 'Петро', 'Сергій', 'Олена'];
const lastNames = ['Пупкін', 'Шевченко', 'Коваленко', 'Бондар', 'Мельник', 'Ткаченко', 'Іваненко'];

const getRandomElement = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
 
export const generateRandomFullName = (): string => {
  return `${getRandomElement(firstNames)} ${getRandomElement(lastNames)}`;
};