import {createActions, handleActions} from 'redux-actions';
import {resolve, reject} from 'redux-simple-promise';
import {NOT_FOUND} from 'http-status-codes';
import _ from 'lodash';

export const {login, localLogin, localLogout} = createActions({
  LOGIN: credentials => ({
    request: {
      url: '/auth',
      method: 'post',
      data: credentials
    }
  }),
  LOCAL_LOGIN: loginData => loginData,
  LOCAL_LOGOUT: _.noop
});

export default handleActions({
  [login]: ({errorMessage, ...state}) => ({
    ...state,
    isFetching: true
  }),
  [resolve(login)]: () => ({}),
  [reject(login)]: (state, {error: {response: {status, data: message}}}) => ({
    ...state,
    errorMessage: status === NOT_FOUND ? message : 'A problem with the server has occurred =(. Try again later'
  }),
  [localLogin]: (state, {payload: loginData}) => ({
    ...loginData
  }),
  [localLogout]: () => ({})
}, {});
