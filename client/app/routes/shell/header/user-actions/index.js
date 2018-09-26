import {connect} from 'react-redux';

import UserActions from './user-actions';

export default connect(
  ({auth: {user}}) => ({
    user
  }))(UserActions);
