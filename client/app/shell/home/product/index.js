import {connect} from 'react-redux';
import _ from 'lodash';

import Product from './product';

const calculatePricesByCurrency = (product, currencies, selectedCurrency) => ({
  ...product,
  storesDetails: _.sortBy(product.storesDetails.map(({currency, ...x}) => ({
    ...x,
    price: _.round((x.price / currencies[currency]) * currencies[selectedCurrency], 2)
  })), x => x.price)
});

export default connect(
  ({productSearch: {data: product, isFetching}, currencies: { list, selected: currency }}) => ({
    product: product && calculatePricesByCurrency(product, list, currency),
    currency,
    isFetching
  }))(Product);