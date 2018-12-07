import React from 'react';
import {compose, withHandlers} from 'recompose';
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from '@material-ui/core';

export default compose(
  withHandlers({
    invokeActionAndClose: ({onClose: handleClose, action}) => () => {
      const result = action();

      return result.then ? result.then(() => handleClose()) : handleClose();
    }
  })
)(({open: isDialogOpen, onClose: handleClose, invokeActionAndClose, title, content, confirm = 'Ok', cancel = 'Cancel'}) => (
  <Dialog open={isDialogOpen} onClose={handleClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        {content}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={invokeActionAndClose} color='primary'>
        {confirm}
      </Button>
      <Button onClick={handleClose} color='primary' autoFocus>
        {cancel}
      </Button>
    </DialogActions>
  </Dialog>
));