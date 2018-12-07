import React from 'react';

import WithAuth from '../with-auth';

export default ({children}) => (
  <WithAuth>
    {token => token && children}
  </WithAuth>
);