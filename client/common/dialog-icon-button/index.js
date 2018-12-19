import React, {Fragment} from 'react';
import {compose, withStateHandlers} from 'recompose';
import {withStyles} from '@material-ui/core';

import IconButton from '../icon-button';

const style = {
  icon: {
    width: '36px',
    height: '36px'
  }
};

export default compose(
  withStyles(style),
  withStateHandlers({
    isDialogOpen: false
  }, {
    toggleDialog: ({isDialogOpen}) => () => ({isDialogOpen: !isDialogOpen})
  })
)(({classes: {icon: iconClass}, icon, label, isDialogOpen, toggleDialog, children, disabled}) => (
  <Fragment>
    <IconButton classes={{icon: iconClass}} icon={icon} label={label} action={toggleDialog} disabled={disabled} />
    {children({isDialogOpen, toggleDialog})}
  </Fragment>
));