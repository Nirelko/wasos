import React from 'react';
import { Flex } from 'reflexbox';
import Flag from 'react-world-flags';
import { withStyles } from 'material-ui/styles';

const styles = {
  contianer: {
    margin: '25px'
  },
  countries: {
    marginTop: '24px'
  }
};

export default withStyles(styles)(({ classes: { contianer, countries }, price, relatedCountries, countryCode, stockSizes }) => (
  <Flex column align='center' className={contianer}>
    <Flag code={countryCode} height='36' />
    <span className={countries}>{relatedCountries}</span>
    <span>{price}</span>
    {
      stockSizes.map(x => <span key={x}>{x}</span>)
    }
  </Flex>
));