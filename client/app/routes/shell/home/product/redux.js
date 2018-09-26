import {createActions, handleActions} from 'redux-actions';
import {resolve} from 'redux-simple-promise';

export const {loadProduct, loadExampleProduct} = createActions({
  LOAD_PRODUCT: url => ({
    request: {
      url: '/product',
      params: {
        url
      }
    }
  }),
  LOAD_EXAMPLE_PRODUCT: () => ({
    request: {
      url: '/product/example'
    }
  })
});

export default handleActions({
  [loadExampleProduct]: () => ({
    isFetching: true
  }),
  [resolve(loadExampleProduct)]: (state, {payload: {data}}) => ({
    data
  }),
  [loadProduct]: state => ({
    ...state,
    isFetching: true
  }),
  [resolve(loadProduct)]: (state, {payload: {data}}) => ({
    data
  })
}, {});
