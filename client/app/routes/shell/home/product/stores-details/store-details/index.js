import React from 'react';
import {Flex} from 'reflexbox';
import Flag from 'react-world-flags';
import {withStyles} from '@material-ui/core';
import {compose} from 'recompose';
import getSymbolFromCurrency from 'currency-symbol-map';

const styles = theme => ({
  contianer: {
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
  stockSizes: {
    marginTop: '15px'
  },
  notAvailable: {
    marginTop: '15px'
  }
});

export default compose(
  withStyles(styles)
)(({classes, price, relatedCountries, countryCode, currency, originalCurrency, sizesStock = [], sizeScheme, sizeSchemeToSizesNames, doesntExist}) => (
  <Flex column align='center' className={classes.contianer}>
    <Flag code={countryCode} width='64' height='36' />
    <span className={classes.countries}>{relatedCountries}</span>
    {
      doesntExist ? (
        <span className={classes.notAvailable}>Not available at this country</span>
      ) : (
        <Flex column align='center'>
          <span>{originalCurrency}</span>
          <span>{getSymbolFromCurrency(currency)}{price}</span>
          <span className={classes.stockSizes}>Sizes In Stock:</span>
          {
            sizesStock && sizesStock.some(x => x) ?
              sizesStock.map((x, index) => x ? <span key={sizeSchemeToSizesNames[sizeScheme][index]}>{sizeSchemeToSizesNames[sizeScheme][index]}</span> : null) : (
                <span>Out of stock</span>
              )
          }
        </Flex>
      )
    }
  </Flex>
));