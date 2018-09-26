import {createActions, handleActions} from 'redux-actions';
import {resolve, reject} from 'redux-simple-promise';
import {NOT_FOUND} from 'http-status-codes';

export const {login, localLogin} = createActions({
  LOGIN: credentials => ({
    request: {
      url: '/auth',
      method: 'post',
      data: credentials
    }
  }),
  LOCAL_LOGIN: loginData => loginData
});

export default handleActions({
  [login]: ({errorMessage, ...state}) => ({
    ...state,
    isFetching: true
  }),
  [resolve(login)]: state => ({

  }),
  [reject(login)]: (state, {error: {response: {status, data: message}}}) => ({
    ...state,
    errorMessage: status === NOT_FOUND ? message : 'A problem with the server has occurred =(. Try again later'
  }),
  [localLogin]: (state, {payload: loginData}) => ({
    ...loginData
  })
}, {});
