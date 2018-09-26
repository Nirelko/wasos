import React from 'react';
import {MenuItem, Select} from '@material-ui/core';
import {compose, lifecycle} from 'recompose';
import getSymbolFromCurrency from 'currency-symbol-map';
import _ from 'lodash';

import tokenManager from '../../../../../common/token-manager';

export default compose(
  lifecycle({
    componentDidMount () {
      const {loadCurrencies, localLoadCurrencies} = this.props;
      const currencies = tokenManager.get('currencies');

      currencies ? localLoadCurrencies(currencies) : loadCurrencies();
    }
  })
)(({currencies, selected = '', onCurrencyChange}) => (
  <Select
    name='name'
    value={selected}
    displayEmpty
    onChange={onCurrencyChange}
  >
    {
      _.map(currencies, (value, name) => (
        <MenuItem key={name} value={name}>{name} {getSymbolFromCurrency(name)}</MenuItem>))
    }
  </Select>
));