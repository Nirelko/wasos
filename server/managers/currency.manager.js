import moment from 'moment';
import {round} from 'lodash';

import Currency from '../api/currency/currency.model';
import MoneyResource from '../resoucres/money.resource';

const CURRENCY_RELEVANT_SPAN = moment.duration(5, 'days').asMilliseconds();

class CurrencyManager {
  constructor () {
    this.currency = null;
    this.currencyPromise = null;
  }

  getUpdatedCurrencies () {
    return Currency.findOne()
      .then(currency => {
        if (this.isCurrencyNotDated(currency)) {
          this.currency = currency;

          return currency.currencies;
        }

        return Currency.deleteMany({})
          .then(() => new MoneyResource().get())
          .then(currencies => Currency.create({currencies}))
          .then(currency => {
            this.currency = currency.toObject();

            return currency.currencies;
          });
      });
  }

  isCurrencyNotDated (currency) {
    return currency && Date.now() - currency.creationDate < CURRENCY_RELEVANT_SPAN;
  }

  load () {
    return this.get();
  }

  get () {
    this.currencyPromise = this.isCurrencyNotDated(this.currency) ?
      Promise.resolve(this.currency.currencies) :
      this.getUpdatedCurrencies();

    return this.currencyPromise;
  }

  convert (value, baseCurrency, newCurrency) {
    return round((value / this.currency.currencies[baseCurrency]) * this.currency.currencies[newCurrency], 2);
  }
}

export default new CurrencyManager();