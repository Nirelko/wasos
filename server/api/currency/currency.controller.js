import {last, map} from 'lodash';
import {convert} from '@nirelko/wasos-common';
import currencyToCountryCodeMap from 'currency-code-map';

import CurrencyManager from '../../managers/currency.manager';
import LocationResource from '../../resoucres/location.resource';

const DEFAULT_CURRENCY = 'USD';

export const getCurrencies = ({connection: {remoteAddress}}) => new LocationResource().getByIp(last(remoteAddress.split(':')))
  .then(({countryCode}) => CurrencyManager.get().then(currencies => Object
    .assign(...map(currencies, (currencyValue, name) => ({[name]: convert(1, currencies[currencyToCountryCodeMap[countryCode] || DEFAULT_CURRENCY], currencyValue)})))));