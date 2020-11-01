import {last, map, uniq, pick} from 'lodash';
import {convert} from '@nirelko/wasos-common';
import currencyToCountryCodeMap from 'currency-code-map';

import StoreDetails from '../../managers/asos/store-details';
import CurrencyManager from '../../managers/currency.manager';
import LocationResource from '../../resoucres/location.resource';

const DEFAULT_CURRENCY = 'USD';

function getRelevantCurrencies (currencies) {
  return StoreDetails.find().select({currencies: 1})
    .then(storesCurrencies => {
      const relevantCurrencies = uniq(storesCurrencies.map(x => x.currencies).flat());

      return pick(currencies, relevantCurrencies);
    });
}

export const getCurrencies = ({connection: {remoteAddress}}) => new LocationResource().getByIp(last(remoteAddress.split(':')))
  .then(({countryCode}) => CurrencyManager.get()
    .then(currencies => getRelevantCurrencies(currencies))
    .then(currencies => ({
      selected: currencyToCountryCodeMap[countryCode] || DEFAULT_CURRENCY,
      currencies: Object
        .assign(...map(currencies, (currencyValue, name) => ({[name]: convert(1, currencies[currencyToCountryCodeMap[countryCode] || DEFAULT_CURRENCY], currencyValue)})))
    })));