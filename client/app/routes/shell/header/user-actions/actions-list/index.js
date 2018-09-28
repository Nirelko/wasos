import {connect} from 'react-redux';

import tokenManager from '../../../../../../common/token-manager';
import {localLogout} from '../../../../exterior/login/redux';
import ActionsList from './actions-list';

export default connect(() => ({}),
  dispatch => ({
    localLogout: credentials => {
      dispatch(localLogout(credentials));
      tokenManager.remove('auth');
    }
  }))(ActionsList);