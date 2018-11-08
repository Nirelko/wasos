import {createModelAndSeed} from '../../../config/db/seed';

export default createModelAndSeed([{
  name: 'unitedStates',
  store: 'US',
  currencies: [
    'USD'
  ],
  sizeSchema: 'US',
  countryCode: 'US',
  relatedCountries: 'United States'
}, {
  name: 'unitedKingdom',
  store: 'COM',
  currencies: [
    'GBP'
  ],
  sizeSchema: 'UK',
  countryCode: 'GB',
  relatedCountries: 'United Kingdom'
}, {
  name: 'spain',
  store: 'ES',
  currencies: [
    'EUR'
  ],
  countryCode: 'ES',
  sizeSchema: 'ES',
  relatedCountries: 'Spain'
}, {
  name: 'russia',
  store: 'RU',
  currencies: [
    'RUB'
  ],
  countryCode: 'RU',
  sizeSchema: 'RU',
  relatedCountries: 'Russia'
}, {
  name: 'GIF',
  store: 'IT',
  currencies: [
    'EUR',
    'CHF'
  ],
  countryCode: 'IT',
  sizeSchema: 'IT',
  relatedCountries: 'Italy, Germany, France'
}, {
  name: 'Australia',
  store: 'AU',
  currencies: [
    'AUD'
  ],
  countryCode: 'AU',
  sizeSchema: 'AU',
  relatedCountries: 'Australia'
}, {
  name: 'HongKong',
  store: 'ROW',
  currencies: [
    'HKD',
    'GBP'
  ],
  countryCode: 'HK',
  sizeSchema: 'UK',
  relatedCountries: 'Hong Kong'
}, {
  name: 'Greece',
  store: 'ROE',
  currencies: [
    'EUR',
    'GBP'
  ],
  countryCode: 'GR',
  sizeSchema: 'UK',
  relatedCountries: 'Rest Of Europe'
}, {
  name: 'Israel',
  store: 'ROW',
  currencies: [
    'GBP',
    'USD',
    'ILS'
  ],
  countryCode: 'IL',
  sizeSchema: 'EU',
  relatedCountries: 'Rest Of The World'
}]);