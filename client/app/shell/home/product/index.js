import {connect} from 'react-redux';
import _ from 'lodash';

import Product from './product';

const calculatePricesByCurrency = (product, currencies, selectedCurrency) => ({
  ...product,
  storesDetails: _.sortBy(product.storesDetails.map(({ price, currency, relatedCountries, countryCode, stockSizes }) => ({
    price: _.round((price / currencies[currency]) * currencies[selectedCurrency], 2),
    relatedCountries,
    countryCode,
    stockSizes
  })), x => x.price)
});

export default connect(
  ({productSearch: {data: product, isFetching}, currencies: { list, selected: currency }}) => ({
    product: product && calculatePricesByCurrency(product, list, currency),
    currency,
    isFetching
  }))(Product);