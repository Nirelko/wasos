import {createActions, handleActions} from 'redux-actions';
import {resolve, reject} from 'redux-simple-promise';

export const {addWatch, removeWatch} = createActions({
  ADD_WATCH: ({username, ...watch}) => ({
    request: {
      url: `/user/${username}/watch`,
      method: 'post',
      data: watch
    }
  }),
  REMOVE_WATCH: (username, productId) => ({
    request: {
      url: `/user/${username}/watch`,
      method: 'delete',
      params: {productId}
    }
  })
});

export default handleActions({
  [addWatch]: state => ({
    ...state,
    isFetching: true
  }),
  [resolve(addWatch)]: () => ({}),
  [reject(addWatch)]: state => ({
    ...state
  })
}, {});
