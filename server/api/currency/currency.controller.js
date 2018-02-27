import _ from 'lodash';
import currencyToCountryCodeMap from 'currency-code-map';

import MoneyResource from '../../resoucres/money.resource';
import LocationResource from '../../resoucres/location.resource';

export const getCurrencies = ({ connection: { remoteAddress } }) => new LocationResource().getByIp(_.last(remoteAddress.split(':')))
  .then(({ country_code: countryCode }) => new MoneyResource().get(currencyToCountryCodeMap[countryCode]));