import {connect} from 'react-redux';

import tokenManager from '../../../../../../../common/token-manager';
import {updateWatch} from '../../../../home/product/header/header-actions/watch-actions/redux';
import UpdateWatchDetails from './details';

export default connect(
  ({auth: {user: {username}}}) => ({
    username
  }), dispatch => ({
    dispatchUpdateWatch: (username, watch) => dispatch(updateWatch(username, watch))
      .then(({payload: {data: user}}) => tokenManager.replaceData('auth', {
        ...tokenManager.get('auth'),
        user
      }))
  })
)(UpdateWatchDetails);