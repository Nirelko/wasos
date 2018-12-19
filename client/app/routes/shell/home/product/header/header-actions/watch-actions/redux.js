import {createActions, handleActions} from 'redux-actions';
import {resolve, reject} from 'redux-simple-promise';

export const {addWatch, updateWatch, removeWatch, removeWatches} = createActions({
  ADD_WATCH: ({username, ...watch}) => ({
    request: {
      url: `/user/${username}/watch`,
      method: 'post',
      data: watch
    }
  }),
  UPDATE_WATCH: (username, watch) => ({
    request: {
      url: `/user/${username}/watch`,
      method: 'put',
      data: watch
    }
  }),
  REMOVE_WATCH: (username, productId) => ({
    request: {
      url: `/user/${username}/watch`,
      method: 'delete',
      params: {productId}
    }
  }),
  REMOVE_WATCHES: (username, productsId) => ({
    request: {
      url: `/user/${username}/watch`,
      method: 'delete',
      data: {productsId}
    }
  })
});

const FetchingState = state => ({
  ...state,
  isFetching: true
});

const rejectedState = ({isFetching, ...state}) => ({
  ...state
});

export default handleActions({
  [addWatch]: FetchingState,
  [resolve(addWatch)]: () => ({}),
  [reject(addWatch)]: rejectedState,
  [updateWatch]: FetchingState,
  [resolve(updateWatch)]: () => ({}),
  [reject(updateWatch)]: rejectedState,
  [removeWatch]: FetchingState,
  [resolve(removeWatch)]: () => ({}),
  [reject(removeWatch)]: rejectedState,
  [removeWatches]: FetchingState,
  [resolve(removeWatches)]: () => ({}),
  [reject(removeWatches)]: rejectedState
}, {});
