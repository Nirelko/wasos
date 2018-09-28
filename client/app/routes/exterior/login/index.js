import {connect} from 'react-redux';
import {push} from 'connected-react-router';

import tokenManager from '../../../../common/token-manager';
import {login, localLogin} from './redux';
import Login from './login';

export default connect(({auth: {errorMessage}}) => ({
  errorMessage
}),
dispatch => ({
  login: credentials => dispatch(login(credentials))
    .then(({payload: {data: loginData}, error}) => {
      if (error) {
        return;
      }

      tokenManager.add('auth', loginData);

      return dispatch(localLogin(loginData));
    })
    .then(() => dispatch(push('/')))
}))(Login);