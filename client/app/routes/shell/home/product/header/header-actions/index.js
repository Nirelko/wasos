import {connect} from 'react-redux';

import Actions from './header-actions';

export default connect(
  ({productSearch}) => ({
    sizeGuide: productSearch.data && productSearch.data.sizeGuide,
    isExample: productSearch.data && productSearch.data.isExample
  })
)(Actions);