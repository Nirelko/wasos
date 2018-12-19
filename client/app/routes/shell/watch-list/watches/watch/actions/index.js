import React from 'react';
import {withStyles, Paper} from '@material-ui/core';
import {Checkbox} from 'redux-form-material-ui';
import {Field} from 'redux-form';
import {compose} from 'recompose';
import {Flex} from 'reflexbox';

const style = {
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'rgba(0,0,0,0.3)'
  },
  checkboxContainer: {
    borderRadius: '4px 0 0 4px'
  }
};

export default compose(
  withStyles(style)
)(({classes: {container, checkboxContainer}, id}) => (
  <Flex className={container} align='center' justify='flex-end'>
    <Paper className={checkboxContainer}>
      <Field name={id} component={Checkbox} />
    </Paper>
  </Flex>
));