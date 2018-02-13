import { connect } from 'react-redux';

import { loadProduct } from '../product/redux';
import Search from './search';

export default connect(
  ({ productSearch: {isFetching } }) => ({ isFetching }),
  dispatch => ({
    onProductSearch ({ url }) {
      dispatch(loadProduct(url));
    }
  }))(Search);