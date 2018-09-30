import moment from 'moment';
import {round} from 'lodash';

import Currency from '../api/currency/currency.model';
import MoneyResource from '../resoucres/money.resource';

const CURRENCY_RELEVANT_SPAN = moment.duration(5, 'days').asMilliseconds();

class CurrencyManager {
  constructor () {
    this.currency = null;
  }

  getUpdatedCurrencies () {
    return Currency.findOne()
      .then(currency => {
        if (this.isCurrencyRelevant(currency)) {
          this.currency = currency;

          return currency.currencies;
        }

        return Currency.deleteMany({})
          .then(() => new MoneyResource().get())
          .then(currencies => Currency.create({currencies}));
      });
  }

  isCurrencyRelevant (currency) {
    return currency && Date.now() - currency.creationDate < CURRENCY_RELEVANT_SPAN;
  }

  load () {
    return this.get();
  }

  get () {
    return this.isCurrencyRelevant(this.currency) ?
      Promise.resolve(this.currency.currencies) :
      this.getUpdatedCurrencies();
  }

  convert (value, baseCurrency, newCurrency) {
    return round((value / this.currency.currencies[baseCurrency]) * this.currency.currencies[newCurrency], 2);
  }
}

export default new CurrencyManager();