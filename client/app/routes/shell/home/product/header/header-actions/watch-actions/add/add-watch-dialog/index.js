import {connect} from 'react-redux';
import {map, head, orderBy} from 'lodash';
import {convert} from '@nirelko/wasos-common';

import {addWatch} from '../../redux';
import tokenManager from '../../../../../../../../../../common/token-manager';
import WatchListAddDialog from './add-watch.dialog';

export default connect(
  ({productSearch: {data: {storesDetails, ...product} = {}},
    currencies: {list: currencies, selected: selectedCurrency},
    auth: {user: {username}}}) => ({
    product,
    username,
    selectedCurrency,
    minimumPrice: head(orderBy(map(storesDetails, ({currency: originalCurrency, price}) => convert(price, currencies[originalCurrency], currencies[selectedCurrency]))
      .filter(x => !Number.isNaN(x))))
  }), dispatch => ({
    dispatchAddWatch: newWatch => dispatch(addWatch(newWatch))
      .then(({payload: {data: user}}) => tokenManager.replaceData('auth', {
        ...tokenManager.get('auth'),
        user
      }))
  })
)(WatchListAddDialog);