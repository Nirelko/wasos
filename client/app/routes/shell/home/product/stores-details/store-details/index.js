import React from 'react';
import {Flex} from 'reflexbox';
import Flag from 'react-world-flags';
import {withStyles} from '@material-ui/core';
import {compose} from 'recompose';
import getSymbolFromCurrency from 'currency-symbol-map';

const styles = {
  contianer: {
    margin: '25px'
  },
  countries: {
    marginTop: '24px'
  },
  stockSizes: {
    marginTop: '15px'
  },
  notAvailable: {
    marginTop: '15px'
  }
};

export default compose(
  withStyles(styles)
)(({classes, price, relatedCountries, countryCode, currency, originalCurrency, stockSizes = [], doesntExist}) => (
  <Flex column align='center' className={classes.contianer}>
    <Flag code={countryCode} height='36' />
    <span className={classes.countries}>Related: {relatedCountries}</span>
    {
      doesntExist ? (
        <span className={classes.notAvailable}>Not available at this country</span>
      ) : (
        <Flex column align='center'>
          <span>Use: {originalCurrency}</span>
          <span>{getSymbolFromCurrency(currency)}{price}</span>
          <span className={classes.stockSizes}>Sizes In Stock:</span>
          {
            stockSizes && stockSizes.length ?
              stockSizes.map(x => <span key={x}>{x}</span>) : (
                <span>Out of stock</span>
              )
          }
        </Flex>
      )
    }
  </Flex>
));