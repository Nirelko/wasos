import React from 'react';
import {Switch, Route} from 'react-router-dom';

import ProtectedRoute from '../../../common/protected-route';
import Home from './home';
import WatchList from './watch-list';

export default () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <ProtectedRoute exact path='/watch-list' component={WatchList} />
  </Switch>
);
