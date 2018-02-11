import { createAction, handleActions } from 'redux-actions';

export const loadProduct = createAction('LOAD_PRODUCT', url => ({
  request: {
    url: '/product',
    params: {
      url
    }
  }
}));

export default handleActions({
  [loadProduct]: state => ({
    ...state,
    isFetching: true
  }),
  [`${loadProduct}_SUCCESS`]: (state, { payload: { data } }) => ({
    data
  }),
  [`${loadProduct}_FAIL`]: () => ({
    test: 'no'
  })
}, {});
