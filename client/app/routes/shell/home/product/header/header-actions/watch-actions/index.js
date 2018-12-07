import {connect} from 'react-redux';

import WatchAction from './watch-actions';

export default connect(
  ({
    auth: {user: {watches}},
    productSearch: {data}
  }) => ({
    watches: watches.map(x => x.product.id),
    productId: data && data.id
  })
)(WatchAction);