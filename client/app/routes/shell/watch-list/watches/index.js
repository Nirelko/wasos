import React, {Fragment} from 'react';
import {Typography} from '@material-ui/core';

import Watch from './watch';

export default ({watches, isMultiSelect}) => (
  <Fragment>
    {watches.length ? watches.map(x => <Watch key={x._id} watch={x} isMultiSelect={isMultiSelect} />) :
      <Typography variant='headline'>There are watches yet ;(</Typography>}
  </Fragment>
);