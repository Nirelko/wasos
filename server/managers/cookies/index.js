import puppeteer from 'puppeteer';

class CookiesManger {
  init () {
    return puppeteer.launch().then(browser => {
      this.browser = browser;
    });
  }

  getCookie (address) {
    return this.browser.createIncognitoBrowserContext()
      .then(context => context.newPage()
        .then(page => page.goto(address)
          .then(() => page.cookies()))
        .then(cookies => {
          return Promise.all([context.close(),
            Promise.resolve(this.calculateCookie(cookies))]);
        })
        .then(([close, cookie]) => cookie));
  }

  calculateCookie (cookies) {
    return `browseCountry=${cookies.find(x => x.name === 'geocountry').value};browseCurrency=GBP;storeCode=ROW;${cookies.map(({name, value}) => `${name} = ${value}`).join(';')}`;
  }
}

export default new CookiesManger();