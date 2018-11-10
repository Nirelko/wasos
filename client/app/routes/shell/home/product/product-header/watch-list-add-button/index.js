import React from 'react';
import {EyePlus} from 'mdi-material-ui';
import {withStyles, IconButton} from '@material-ui/core';
import {compose} from 'recompose';

const ToolBarStyle = {
  icon: {
    height: '36px',
    width: '36px'
  },
};

export default compose(
  withStyles(ToolBarStyle)
)(({classes: {icon}}) => (
  <IconButton>
    <EyePlus className={icon} />
  </IconButton>
));