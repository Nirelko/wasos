import {createActions, handleActions} from 'redux-actions';
import {resolve, reject} from 'redux-simple-promise';
import _ from 'lodash';

export const {loadCurrencies, localLoadCurrencies, selectedCurrencyChanged} = createActions({
  LOAD_CURRENCIES: () => ({
    request: {
      url: '/currency'
    }
  }),
  LOCAL_LOAD_CURRENCIES: currencies => currencies,
  SELECTED_CURRENCY_CHANGED: name => name
});

export default handleActions({
  [loadCurrencies]: state => ({
    ...state,
    isFetching: true
  }),
  [resolve(loadCurrencies)]: (state, {payload: {data: {selected, currencies: list}}}) => ({
    list,
    selected
  }),
  [reject(loadCurrencies)]: state => ({
    ...state
  }),
  [localLoadCurrencies]: (state, {payload: {currencies: list, selected}}) => ({
    list,
    selected
  }),
  [selectedCurrencyChanged]: (state, {payload: selected}) => ({
    ...state,
    selected
  })
}, {});
