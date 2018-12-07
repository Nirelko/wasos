import React from 'react';
import {withStyles, CardContent, Typography} from '@material-ui/core';
import {green} from '@material-ui/core/colors';
import {reflex, Flex} from 'reflexbox';
import {compose, lifecycle} from 'recompose';

const style = {
  blessing: {
    color: green[500]
  }
};

const FlexCardContent = reflex(CardContent);

export default compose(
  withStyles(style),
  lifecycle({
    componentDidMount() {
      const {moveToLogin} = this.props;

      setTimeout(() => moveToLogin(), 5000)
    }
  })
)(({classes: {blessing}, location: {state: {username}}}) => (
  <FlexCardContent column flex auto align='center'>
    <Flex auto column align='center' justify='center'>
      <Typography variant='h3' paragraph={true} className={blessing}>Register Successfully!</Typography>
      <Typography variant='h4'>Welcome {username} to wasos family!</Typography>
    </Flex>
    <Typography variant='caption'>You will be moved to login in 5 seconds...</Typography>
  </FlexCardContent>
));