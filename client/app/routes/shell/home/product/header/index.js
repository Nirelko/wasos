import React from 'react';
import {Flex, reflex} from 'reflexbox';
import {withStyles, Typography} from '@material-ui/core';
import {compose} from 'recompose';

import CurrencyChooser from '../../../header/currency-chooser';
import Actions from './header-actions';

const ReflexTypography = reflex(Typography);

const styles = {
  container: {
    marginLeft: '8px'
  }
};

export default compose(
  withStyles(styles)
)(({classes: {container, actions}, name}) => (
  <Flex align='center' className={container}>
    <ReflexTypography flex auto type='title' variant='subtitle1'> {name} </ReflexTypography>
    <CurrencyChooser />
    <Actions className={actions} />
  </Flex>
));
