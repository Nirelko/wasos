import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import WithAuth from '../with-auth';

export default ({component: Component, ...props}) => (
  <WithAuth>
    {
      token => (
        <Route
          {...props}
          render={props => (token ? <Component {...props} /> : <Redirect to='/' />)}
        />
      )
    }
  </WithAuth>
);