import React from 'react';
import {Flex, reflex} from 'reflexbox';
import {withStyles, Typography} from '@material-ui/core';
import {compose} from 'recompose';

import WatchListAddButton from './watch-list-add-button';

const ReflexTypography = reflex(Typography);

const styles = {
  container: {
    marginLeft: '25px',
    position: 'absolute',
    top: '8px',
    left: '416px',
    right: '0'
  }
};

export default compose(
  withStyles(styles)
)(({classes: {container}, name}) => (
  <Flex className={container} type='title' align='center'>
    <ReflexTypography flex auto type='title' variant='subheading'> {name} </ReflexTypography>
    <WatchListAddButton />
  </Flex>
));
