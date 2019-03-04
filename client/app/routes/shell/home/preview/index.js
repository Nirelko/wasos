import React from 'react';
import {Grid, withStyles} from '@material-ui/core';
import {CurrencyEur, AlarmCheck, CurrencyUsd} from 'mdi-material-ui';
import {compose} from 'recompose';
import {reflex} from 'reflexbox';

const ReflexGrid = reflex(Grid);

const styles = theme => ({
  container: {
    [theme.breakpoints.up('lg')]: {
      padding: '48px 0'
    },
    [theme.breakpoints.down('md')]: {
      textAlign: 'center'
    }
  },
  title: {
    fontSize: '40px',
    marginBottom: '20px',
    [theme.breakpoints.down('md')]: {
      padding: '8px'
    }
  },
  subTitle: {
    fontSize: '20px'
  },
  mainIcon: {
    [theme.breakpoints.up('lg')]: {
      height: '150px',
      width: '150px'
    },
    [theme.breakpoints.down('md')]: {
      height: '125px',
      width: '125px'
    }
  },
  subIcon: {
    [theme.breakpoints.up('lg')]: {
      height: '115px',
      width: '115px'
    },
    [theme.breakpoints.down('md')]: {
      height: '100px',
      width: '100px'
    }
  }
});

export default compose(
  withStyles(styles)
)(({classes: {title, subTitle, mainIcon, subIcon, container}}) => (
  <ReflexGrid auto container className={container}>
    <ReflexGrid item lg={6} sm={12} auto flex column align='center' justify='center'>
      <span className={title}>Save your time and money</span>
      <span className={subTitle}>Find your size at the best price of Asos products</span>
    </ReflexGrid>
    <ReflexGrid item lg={6} sm={12} flex auto align='center' justify='center'>
      <CurrencyUsd className={subIcon} />
      <AlarmCheck className={mainIcon} />
      <CurrencyEur className={subIcon} />
    </ReflexGrid>
  </ReflexGrid>));