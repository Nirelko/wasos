import {connect} from 'react-redux';

import tokenManager from '../../../../../../../common/token-manager';
import {loadCurrencies, localLoadCurrencies, selectedCurrencyChanged} from './redux';
import CurrencyChooser from './currency-chooser';

export default connect(
  ({currencies: {isFetching, list: currencies, selected}}) => ({
    isFetching,
    currencies,
    selected,
    initialValues: {name: selected}
  }),
  dispatch => ({
    loadCurrencies () {
      return dispatch(loadCurrencies())
        .then(({payload: {data: currencies}}) => {
          tokenManager.add('currencies', currencies);
        });
    },
    localLoadCurrencies (currencies) {
      return dispatch(localLoadCurrencies(currencies));
    },
    loadCurrency (currency) {
      return dispatch(selectedCurrencyChanged(currency));
    },
    onCurrencyChange ({target: {value: newCurrency}}) {
      localStorage.setItem('currency', newCurrency);

      return dispatch(selectedCurrencyChanged(newCurrency));
    }
  }))(CurrencyChooser);