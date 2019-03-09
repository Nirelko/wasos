import React from 'react';
import {Flex} from 'reflexbox';
import Flag from 'react-world-flags';
import {withStyles} from '@material-ui/core';
import {compose} from 'recompose';
import getSymbolFromCurrency from 'currency-symbol-map';

const styles = theme => ({
  container: {
    [theme.breakpoints.up('lg')]: {
      margin: '70px 25px 0'
    },
    [theme.breakpoints.down('md')]: {
      margin: '20px 5px 0'
    }
  },
  countries: {
    marginTop: '24px'
  },
  stockSizesText: {
    marginTop: '15px'
  },
  notAvailable: {
    marginTop: '15px'
  }
});

export default compose(
  withStyles(styles)
)(({classes: {container, countries, notAvailable, stockSizesText}, price, relatedCountries, countryCode, currency, originalCurrency, stockSizes = [], doesntExist}) => (
  <Flex column align='center' className={container}>
    <Flag code={countryCode} width='64' height='36' />
    <span className={countries}>{relatedCountries}</span>
    {
      doesntExist ? (
        <span className={notAvailable}>Not available at this country</span>
      ) : (
        <Flex column align='center'>
          <span>{originalCurrency}</span>
          <span>{getSymbolFromCurrency(currency)}{price}</span>
          <span className={stockSizesText}>Sizes In Stock:</span>
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