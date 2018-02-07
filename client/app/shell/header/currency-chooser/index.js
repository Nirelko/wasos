import { connect } from 'react-redux';

import { loadCurrencies, selectedCurrencyChanged } from './redux';
import CurrencyChooser from './currency-chooser';

export default connect(
  ({ currencies: { isFetching, list: currencies, selected } }) => ({
    isFetching,
    currencies,
    selected,
    initialValues: {name: selected}
  }),
  dispatch => ({
    loadCurrencies () {
      dispatch(loadCurrencies());
    },
    onCurrencyChange ({target: { value } }) {
      dispatch(selectedCurrencyChanged(value));
    }
  }))(CurrencyChooser);