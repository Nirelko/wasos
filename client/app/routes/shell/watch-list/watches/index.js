import React, {Fragment} from 'react';

import Watch from './watch';

export default ({watches, isMultiSelect}) => (
  <Fragment>
    {watches.map(x => <Watch key={x._id} watch={x} isMultiSelect={isMultiSelect} />)}
  </Fragment>
);