import {map} from 'lodash';

import BasicResource from './basic.resource';

const removeBaseCurrencyName = (currentCurrency, baseCurrency) => currentCurrency.substring(baseCurrency.length);

class MoneyResource extends BasicResource {
  constructor () {
    super(`http://apilayer.net/api/live`);
  }

  get (baseCurrency = 'USD') {
    return this.client.get('', {
      params: {
        source: baseCurrency,
        access_key: process.env.CURRENCY_API_KEY
      }
    })
      .then(({data: {quotes: rates}}) => Object.assign(...map(rates, (value, currencyName) => ({[removeBaseCurrencyName(currencyName, baseCurrency)]: value}))));
  }
}

export default MoneyResource;