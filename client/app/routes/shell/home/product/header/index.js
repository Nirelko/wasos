import React, {Fragment} from 'react';
import {Flex, reflex} from 'reflexbox';
import {withStyles, Typography} from '@material-ui/core';
import {compose} from 'recompose';

import SizeSchemeChooser from './size-scheme-chooser';
import CurrencyChooser from './currency-chooser';
import Actions from './header-actions';

const ReflexTypography = reflex(Typography);

const styles = {
  container: {
    marginLeft: '8px'
  },
  currencyChooser: {
    marginLeft: '8px'
  }
};

export default compose(
  withStyles(styles)
)(({classes: {container, currencyChooser, actions}, name, universalScheme}) => (
  <Flex align='center' className={container}>
    <ReflexTypography flex auto type='title' variant='subtitle1'> {name} </ReflexTypography>
    { !universalScheme ? <SizeSchemeChooser /> : <Fragment /> }
    <CurrencyChooser className={currencyChooser} />
    <Actions className={actions} />
  </Flex>
));
