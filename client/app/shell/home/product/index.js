import {connect} from 'react-redux';

import Product from './product';

export default connect(
  ({productSearch: {data: product}, isFetching}) => ({
    product,
    isFetching
  }))(Product);