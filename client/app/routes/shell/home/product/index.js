import {connect} from 'react-redux';
import {sortBy} from 'lodash';
import {convert} from '@nirelko/wasos-common';

import {loadProduct, loadExampleProduct} from './redux';
import Product from './product';

const calculatePricesByCurrency = (product, currencies, selectedCurrency) => ({
  ...product,
  storesDetails: sortBy(product.storesDetails.map(({currency: originalCurrency, ...x}) => ({
    ...x,
    originalCurrency,
    price: convert(x.price, currencies[originalCurrency], currencies[selectedCurrency])
  })), x => x.price)
});

export default connect(
  ({productSearch: {data: product, isFetching}, currencies: {list, selected: currency}}) => ({
    product: product && list && calculatePricesByCurrency(product, list, currency),
    currency,
    isFetching
  }), dispatch => ({
    initExampleProduct () {
      dispatch(loadExampleProduct());
    },
    loadProduct (url) {
      dispatch(loadProduct(url));
    }
  }))(Product);