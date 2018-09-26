import React from 'react';
import {withStyles, IconButton} from '@material-ui/core';
import {compose} from 'recompose';
import {AccountCircle} from 'mdi-material-ui';

const style = {
  accountIcon: {
    height: '36px',
    width: '36px'
  }
};

export default compose(
  withStyles(style)
)(({classes: {accountIcon}}) => (
  <IconButton>
    <AccountCircle className={accountIcon}/>
  </IconButton>
));