import React from 'react';
import {Plus} from 'mdi-material-ui';
import {withStyles, IconButton} from '@material-ui/core';
import {green} from '@material-ui/core/colors';
import {compose} from 'recompose';

const ToolBarStyle = {
  icon: {
    height: '36px',
    width: '36px'
  },
  iconButton: {
    color: green[600]
  }
};

export default compose(
  withStyles(ToolBarStyle)
)(({classes: {iconButton, icon}}) => (
  <IconButton className={iconButton}>
    <Plus className={icon} />
  </IconButton>
));