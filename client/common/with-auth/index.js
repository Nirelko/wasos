import {connect} from 'react-redux';

import WithAuth from './with-auth';

export default connect(
  ({auth: {token}}) => ({token})
)(WithAuth);