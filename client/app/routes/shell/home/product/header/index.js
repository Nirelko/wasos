import React from 'react';
import {Flex, reflex} from 'reflexbox';
import {withStyles, Typography} from '@material-ui/core';
import {compose} from 'recompose';

import Actions from './header-actions';

const ReflexTypography = reflex(Typography);

const styles = {
  container: {
    marginLeft: '25px',
    position: 'absolute',
    top: '8px',
    left: '416px',
    right: '8px'
  }
};

export default compose(
  withStyles(styles)
)(({classes: {container, actions}, name}) => (
  <Flex className={container} type='title' align='center'>
    <ReflexTypography flex auto type='title' variant='subtitle1'> {name} </ReflexTypography>
    <Actions className={actions} />
  </Flex>
));
