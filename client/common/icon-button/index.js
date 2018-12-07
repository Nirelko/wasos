import React from 'react';
import {withStyles, IconButton, Tooltip} from '@material-ui/core';
import {compose} from 'recompose';

const ToolBarStyle = {
  icon: {
    height: '36px',
    width: '36px'
  }
};

export default compose(
  withStyles(ToolBarStyle)
)(({classes: {icon}, icon: ActionIcon, action, label}) => (
  <Tooltip title={label} placement='top'>
    <IconButton onClick={action}>
      <ActionIcon className={icon} />
    </IconButton>
  </Tooltip>
));