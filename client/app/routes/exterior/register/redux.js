import {createActions, handleActions} from 'redux-actions';
import {resolve, reject} from 'redux-simple-promise';

export const {register, isUsernameAvailable} = createActions({
  REGISTER: newUser => ({
    request: {
      url: '/user',
      method: 'post',
      data: newUser
    }
  }),
  IS_USERNAME_AVAILABLE: username => ({
    request: {
      url: '/user/username-available',
      method: 'get',
      params: {username}
    }
  })
});

export default handleActions({
  [register]: state => ({
    ...state,
    isFetching: true
  }),
  [resolve(register)]: state => ({
    ...state
  }),
  [reject(register)]: state => ({
    ...state
  })
}, {});
