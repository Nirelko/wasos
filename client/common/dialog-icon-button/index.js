import React, {Fragment} from 'react';
import {compose, withStateHandlers} from 'recompose';

import IconButton from '../icon-button';

export default compose(
  withStateHandlers({
    isDialogOpen: false
  }, {
    toggleDialog: ({isDialogOpen}) => () => ({isDialogOpen: !isDialogOpen})
  })
)(({icon, label, isDialogOpen, toggleDialog, children}) => (
  <Fragment>
    <IconButton icon={icon} label={label} action={toggleDialog} />
    {children({isDialogOpen, toggleDialog})}
  </Fragment>
));