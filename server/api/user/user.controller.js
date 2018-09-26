import {BAD_REQUEST} from 'http-status-codes';

import User from './user.model';

export const register = ({body: newUser}, res) => {
  if (newUser.password !== newUser.repassword) {
    return res.status(BAD_REQUEST).send('The passwords are not the same');
  }

  return User.create(newUser)
    .then(({username}) => ({username}));
};

export const isUsernameAvailable = ({query: {username}}) => User.findOne({username}).then(user => !user);