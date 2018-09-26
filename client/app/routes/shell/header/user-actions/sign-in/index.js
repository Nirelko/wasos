import React from 'react';
import {withStyles, Button} from '@material-ui/core';
import {compose} from 'recompose';
import {Link} from 'react-router-dom';

const style = {
  signInButton: {
    textDecoration: 'none'
  }
};

export default compose(
  withStyles(style)
)(({classes: {signInButton}}) => (
  <Link to='/user/login' className={signInButton}>
    <Button>
      <span>Sign In</span>
    </Button>
  </Link>
));