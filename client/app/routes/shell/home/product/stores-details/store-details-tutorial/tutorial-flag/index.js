import React from 'react';
import {Flex} from 'reflexbox';
import {withStyles} from '@material-ui/core';
import {compose} from 'recompose';

const styles = {
  container: {
    width: '64px',
    height: '36px',
    background: '#cacaca'
  }
};

export default compose(
  withStyles(styles)
)(({classes: {container}}) => (
  <Flex align='center' justify='center' className={container}>
    <span>Use this country</span>
  </Flex>
));