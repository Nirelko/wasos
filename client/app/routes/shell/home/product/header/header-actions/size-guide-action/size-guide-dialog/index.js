import {connect} from 'react-redux';

import SizeGuideDialog from './size-guide.dialog';

export default connect(
  ({productSearch}) => ({sizeGuide: productSearch.data && productSearch.data.sizeGuide})
)(SizeGuideDialog);