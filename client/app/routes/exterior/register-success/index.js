import {connect} from 'react-redux';
import {push} from 'connected-react-router';

import RegisterSuccess from './register-success';

export default connect(({register: {isFetching}}) => ({
  isFetching
}),
dispatch => ({
  moveToLogin: () => dispatch(push('login'))
}))(RegisterSuccess);