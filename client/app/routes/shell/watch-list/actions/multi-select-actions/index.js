import {connect} from 'react-redux';

import tokenManager from '../../../../../../common/token-manager';
import {removeWatches} from '../../../home/product/header/header-actions/watch-actions/redux';
import MultiSelectActions from './multi-select-actions';

export default connect(
  ({auth: {user: {username}},
    productSearch: {data},
    form: {selectWatches: {values: selectedWatches} = {}}}) => ({
    username,
    selectedWatches: selectedWatches || {},
    productId: data && data.id
  }), dispatch => ({
    dispatchRemoveWatch: (username, productsId, toggleMultiSelect) => dispatch(removeWatches(username, productsId))
      .then(({payload: {data: user}}) => tokenManager.replaceData('auth', {
        ...tokenManager.get('auth'),
        user
      }))
      .then(() => toggleMultiSelect())
  })
)(MultiSelectActions);