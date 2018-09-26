import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {localLogin} from './exterior/login/redux';
import Routes from './routes';


export default withRouter(connect(() => ({}),
  dispatch => ({
    localLogin (auth) {
      dispatch(localLogin(auth));
    }
  }))(Routes));