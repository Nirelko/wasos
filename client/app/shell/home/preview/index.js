import React from 'react';
import withStyles from 'material-ui/styles/withStyles';
import { CurrencyEur, AlarmCheck, CurrencyUsd } from 'mdi-material-ui';
import Flex from 'reflexbox/dist/Flex';

const styles = {
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

export default withStyles(styles)(({ classes: {title, subTitle, mainIcon, subIcon} }) => (
  <Flex auto>
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