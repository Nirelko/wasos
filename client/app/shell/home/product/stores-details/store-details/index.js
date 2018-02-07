import React from 'react';
import { Flex } from 'reflexbox';
import Flag from 'react-world-flags';
import { withStyles } from 'material-ui/styles';
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
  }
};

export default withStyles(styles)(({ classes, price, relatedCountries, countryCode, currency, stockSizes }) => (
  <Flex column align='center' className={classes.contianer}>
    <Flag code={countryCode} height='36' />
    <span className={classes.countries}>Related: {relatedCountries}</span>
    <span>{getSymbolFromCurrency(currency)}{price}</span>
    <span className={classes.stockSizes}>Sizes In Stock:</span>
    {
      stockSizes.map(x => <span key={x}>{x}</span>)
    }
  </Flex>
));