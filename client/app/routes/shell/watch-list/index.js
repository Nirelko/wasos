import {connect} from 'react-redux';

import WatchList from './watch-list';

export default connect(
  ({auth: {user: {watches}}}) => ({
    watches
  }))(WatchList);
