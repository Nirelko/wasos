import User from '../user/user.model';
import {NOT_FOUND} from 'http-status-codes';
import jwt from 'jsonwebtoken';

const removeUnwantedFields = ({password, __v, ...user}) => user;

const generateToken = user => ({
  token: jwt.sign(user, process.env.JWT_SECRET),
  user
});

export const login = ({body: {username, password: passwordCredential}}, res) => User.findOne({username}).select('+password')
  .then(user => user ?
    user.verifyPassword(passwordCredential)
      .then(isVerified => isVerified ? generateToken(removeUnwantedFields(user.toObject())) : Promise.reject()) :
    Promise.reject())
  .catch(message => message || res.status(NOT_FOUND).send('The username or password are incorrect'));
