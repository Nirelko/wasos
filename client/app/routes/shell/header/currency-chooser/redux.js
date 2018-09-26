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
  [resolve(loadCurrencies)]: (state, {payload: {data: list}}) => ({
    list,
    selected: state.selected || _.invert(list)[1]
  }),
  [reject(loadCurrencies)]: state => ({
    ...state
  }),
  [localLoadCurrencies]: (state, {payload: list}) => ({
    list,
    selected: state.selected || _.invert(list)[1]
  }),
  [selectedCurrencyChanged]: (state, {payload: selected}) => ({
    ...state,
    selected
  })
}, {});
