import React from 'react';
import { MenuItem, Select } from 'material-ui';
import { compose, lifecycle } from 'recompose';
import getSymbolFromCurrency from 'currency-symbol-map';
import _ from 'lodash';

export default compose(
  lifecycle({
    componentDidMount () {
      const { loadCurrencies } = this.props;

      loadCurrencies();
    }
  })
)(({ currencies, selected = '', onCurrencyChange }) => (
  <Select
    name='name'
    value={selected}
    displayEmpty
    onChange={onCurrencyChange}
  >
    {
      _.map(currencies, (value, name) => (<MenuItem key={name} value={name}>{getSymbolFromCurrency(name)} {name}</MenuItem>))
    }
  </Select>
));