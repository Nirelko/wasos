import React from 'react';
import {MenuItem, Select} from '@material-ui/core';
import {compose, lifecycle} from 'recompose';
import getSymbolFromCurrency from 'currency-symbol-map';
import {map} from 'lodash';

import tokenManager from '../../../../../../../common/token-manager';

export default compose(
  lifecycle({
    componentDidMount () {
      const {loadCurrencies, localLoadCurrencies, loadCurrency} = this.props;
      const currencies = tokenManager.get('currencies');
      const currency = localStorage.getItem('currency');

      if (currency) {
        setTimeout(() => {
          loadCurrency(currency);
        }, 0);
      }

      if (currencies) {
        localLoadCurrencies(currencies);
      }
      else {
        loadCurrencies();
      }
    }
  })
)(({className, currencies, selected = '', onCurrencyChange}) => (
  <Select
    className={className}
    name='name'
    value={selected}
    displayEmpty
    onChange={onCurrencyChange}
  >
    {
      map(currencies, (value, name) => (
        <MenuItem key={name} value={name}>{name} {getSymbolFromCurrency(name)}</MenuItem>))
    }
  </Select>
));