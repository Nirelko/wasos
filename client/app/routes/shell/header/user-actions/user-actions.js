import React from 'react';

import ActionsList from './actions-list';
import SignIn from './sign-in';

export default ({user}) => (user ?
  <ActionsList /> :
  <SignIn />
);