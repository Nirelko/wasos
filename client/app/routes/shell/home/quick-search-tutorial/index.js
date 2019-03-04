import React from 'react';
import {Flex, reflex} from 'reflexbox';
import {Grid, withStyles} from '@material-ui/core';
import {ArrowDown, SubdirectoryArrowLeft} from 'mdi-material-ui';
import {compose} from 'recompose';

const ReflexGrid = reflex(Grid);

const styles = theme => ({
  container: {
    background: theme.palette.primary[400],
    padding: '8px'
  },
  stepArrow: {
    fontSize: '60px'
  },
  step: {
    [theme.breakpoints.up('lg')]: {
      width: '500px',
      padding: '24px'
    },
    [theme.breakpoints.down('md')]: {
      width: '300px',
      padding: '8px'
    }
  },
  stepSentence: {
    marginBottom: '5px'
  },
  enterIcon: {
    margin: '0 2px'
  }
});


export default compose(
  withStyles(styles)
)(({classes: {container, step, stepArrow, stepSentence, enterIcon}}) => (
  <ReflexGrid auto container className={container}>
    <ReflexGrid item lg={6} sm={12} flex column auto align='center'>
      <img className={step} src='http://up419.siz.co.il/up2/m4yzhmwjnjjf.jpg' />
      <ArrowDown className={stepArrow} />
      <img className={step} src='http://up419.siz.co.il/up3/t3oyjehvtozz.jpg' />
    </ReflexGrid>
    <ReflexGrid item lg={6} sm={12} flex column align='center' justify='center' auto>
      <Flex column>
        <h1>Use Our Quick Search</h1>
        <span className={stepSentence}>1. Find your product</span>
        <span className={stepSentence}>2. Swap the url with wasos.org</span>
        <Flex align='center' className={stepSentence}>3. Press <SubdirectoryArrowLeft className={enterIcon} /> Enter and that's it!</Flex>
      </Flex>
    </ReflexGrid>
  </ReflexGrid>
));