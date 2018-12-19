import React, {Fragment} from 'react';
import {compose, withStateHandlers} from 'recompose';

export default compose(
  withStateHandlers({
    isDialogOpen: false
  }, {
    toggleDialog: ({isDialogOpen}) => () => ({isDialogOpen: !isDialogOpen})
  })
)(({isDialogOpen, toggleDialog, children}) => (
  <Fragment>
    {children({isDialogOpen, toggleDialog})}
  </Fragment>
));