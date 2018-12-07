import React, {Fragment} from 'react';

import AddWatchAction from './add';
import CancelWatchAction from './cancel';

export default ({watches, productId}) => (
  <Fragment>
    {
      watches.includes(productId) ? <CancelWatchAction /> : <AddWatchAction />
    }
  </Fragment>
);