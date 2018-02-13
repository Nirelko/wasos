import { createActions, handleActions } from 'redux-actions';

export const { loadProduct, loadExampleProduct } = createActions({
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
  [`${loadExampleProduct}_SUCCESS`]: (state, { payload: { data } }) => ({
    data
  }),
  [loadProduct]: state => ({
    ...state,
    isFetching: true
  }),
  [`${loadProduct}_SUCCESS`]: (state, { payload: { data } }) => ({
    data
  })
}, {});
