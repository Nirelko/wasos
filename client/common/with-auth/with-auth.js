import React, {Fragment} from 'react';

export default ({children, token}) => (
  <Fragment>
    {children(token)}
  </Fragment>
);