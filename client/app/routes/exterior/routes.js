import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Login from './login';
import Register from './register';
import RegisterSuccess from './register-success';

export default () => (
  <Switch>
    <Route path='/user/login' component={Login} />
    <Route exact path='/user/register' component={Register} />
    <Route path='/user/register-success' component={RegisterSuccess} />
  </Switch>
);