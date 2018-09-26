import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {compose, lifecycle} from 'recompose';

import tokenManager from '../../common/token-manager';
import Shell from './shell';
import Exterior from './exterior';

export default compose(
  lifecycle({
    componentDidMount () {
      const {localLogin} = this.props;
      const auth = tokenManager.get('auth');

      auth && localLogin(auth);
    }
  })
)(() => (
  <Switch>
    <Route path='/user' component={Exterior} />
    <Route component={Shell} />
  </Switch>
));
