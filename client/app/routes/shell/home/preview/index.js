import React from 'react';
import {withStyles} from '@material-ui/core';
import {CurrencyEur, AlarmCheck, CurrencyUsd} from 'mdi-material-ui';
import {compose} from 'recompose';
import Flex from 'reflexbox/dist/Flex';

const styles = {
  container: {
    padding: '48px 0'
  },
  title: {
    fontSize: '40px',
    marginBottom: '20px'
  },
  subTitle: {
    fontSize: '20px'
  },
  mainIcon: {
    height: '150px',
    width: '150px'
  },
  subIcon: {
    height: '115px',
    width: '115px'
  }
};

export default compose(
  withStyles(styles)
)(({classes: {title, subTitle, mainIcon, subIcon, container}}) => (
  <Flex auto className={container}>
    <Flex auto column align='center' justify='center'>
      <span className={title}>Save your time and money</span>
      <span className={subTitle}>Find your size at the best price of Asos products</span>
    </Flex>
    <Flex auto align='center' justify='center'>
      <CurrencyUsd className={subIcon} />
      <AlarmCheck className={mainIcon} />
      <CurrencyEur className={subIcon} />
    </Flex>
  </Flex>));