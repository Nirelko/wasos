import { createActions, handleActions } from 'redux-actions';
import _ from 'lodash';

export const {loadCurrencies, selectedCurrencyChanged} = createActions({
  LOAD_CURRENCIES: () => ({
    request: {
      url: '/currency'
    }
  }),
  SELECTED_CURRENCY_CHANGED: name => name
});

export default handleActions({
  [loadCurrencies]: state => ({
    ...state,
    isFetching: true
  }),
  [`${loadCurrencies}_SUCCESS`]: (state, { payload: { data: list } }) => ({
    list,
    selected: state.selected || _.invert(list)[1]
  }),
  [`${loadCurrencies}_FAIL`]: state => ({
    ...state
  }),
  [selectedCurrencyChanged]: (state, { payload: selected }) => ({
    ...state,
    selected
  })
}, {});
