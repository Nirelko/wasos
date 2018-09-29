import {connect} from 'react-redux';

import {loadProduct} from '../../home/product/redux';
import Search from './search';

export default connect(
  ({productSearch: {isFetching}}) => ({isFetching}),
  dispatch => ({
    loadProduct ({url}) {
      dispatch(loadProduct(url));
    }
  }))(Search);