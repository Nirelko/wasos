import puppeteer from 'puppeteer';

class CookiesManger {
  async init () {
    this.browser = await puppeteer.launch();
  }

  async getCookie (address) {
    const context = await this.browser.createIncognitoBrowserContext();
    const page = await context.newPage();

    await page.goto(address);
    const resultCoockie = (await page.cookies()).map(({name, value}) => `${name} = ${value}`).join(';');

    await page.close();
    await context.close();

    return resultCoockie;
  }
}

export default new CookiesManger();