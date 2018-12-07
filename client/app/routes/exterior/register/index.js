import {connect} from 'react-redux';
import {push} from 'connected-react-router';

import {register} from './redux';
import Register from './register';

export default connect(() => ({}),
  dispatch => ({
    register: newUser => dispatch(register(newUser))
      .then(({payload: {data: userData}, error}) => !error && dispatch(push({
        pathname: 'register-success',
        state: userData
      })))
  }))(Register);