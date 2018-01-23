import { connect } from 'react-redux';

import { loadProduct } from './redux';
import Search from './search';

export default connect(
  ({ product: url }) => ({ url }),
  dispatch => ({
    onProductSearch ({ url }) {
      dispatch(loadProduct(url));
    }
  }))(Search);