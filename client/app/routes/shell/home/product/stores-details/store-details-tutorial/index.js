import React from 'react';
import {Flex} from 'reflexbox';
import {withStyles} from '@material-ui/core';
import {compose} from 'recompose';

import TutorialFlag from './tutorial-flag';

const styles = theme => ({
  titleContainer: {
    marginBottom: '8px',
    width: '128px'
  },
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
  }
});

export default compose(
  withStyles(styles)
)(({classes: {titleContainer, container, countries, stockSizesText}}) => (
  <Flex column align='center' className={container}>
    <div className={titleContainer}>
      <span>What country and currency to use</span>
    </div>
    <TutorialFlag/>
    <span className={countries}>Related countries</span>
    <Flex column align='center'>
      <span>Currency to use</span>
      <span>Specific country price</span>
      <span className={stockSizesText}>Sizes In Stock:</span>
      <span>The sizes in stock</span>
      <span>If there is any</span>
    </Flex>
  </Flex>
));