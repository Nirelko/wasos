import {connect} from 'react-redux';

import tokenManager from '../../../../../../../../../common/token-manager';
import {removeWatch} from '../redux';
import CancelWatchDialog from './cancel-watch-action';

export default connect(
  ({auth: {user: {username}},
    productSearch: {data}}) => ({
    username,
    productId: data && data.id
  }), dispatch => ({
    dispatchRemoveWatch: (username, productId) => dispatch(removeWatch(username, productId))
      .then(({payload: {data: user}}) => tokenManager.replaceData('auth', {
        ...tokenManager.get('auth'),
        user
      }))
  })
)(CancelWatchDialog);