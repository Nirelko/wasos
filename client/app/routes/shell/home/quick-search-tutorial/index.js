import React from 'react';
import {Flex} from 'reflexbox';
import {withStyles} from '@material-ui/core';
import {ArrowDown, SubdirectoryArrowLeft} from 'mdi-material-ui';
import {compose} from 'recompose';

const styles = theme => ({
  container: {
    background: theme.palette.primary[400]
  },
  stepArrow: {
    fontSize: '60px'
  },
  step: {
    width: '500px',
    padding: '24px'
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
  <Flex className={container}>
    <Flex column auto align='center'>
      <img className={step} src='http://up419.siz.co.il/up2/m4yzhmwjnjjf.jpg' />
      <ArrowDown className={stepArrow} />
      <img className={step} src='http://up419.siz.co.il/up3/t3oyjehvtozz.jpg' />
    </Flex>
    <Flex justify='center' auto>
      <Flex column>
        <h1>Use Our Quick Search</h1>
        <span className={stepSentence}>1. Find your product</span>
        <span className={stepSentence}>2. Swap the url with wasos.org</span>
        <Flex align='center' className={stepSentence}>3. Press <SubdirectoryArrowLeft className={enterIcon} /> Enter and that's it!</Flex>
      </Flex>
    </Flex>
  </Flex>
));