import React from 'react';
import {compose, withHandlers} from 'recompose';
import {EyeOff} from 'mdi-material-ui';

import DialogIconButton from '../../../../../../../../../common/dialog-icon-button';
import ConfirmDialog from '../../../../../../../../../common/dialogs/confirm.dialog';

export default compose(
  withHandlers({
    removeWatch: ({username, productId, dispatchRemoveWatch}) => () => dispatchRemoveWatch(username, productId)
  })
)(({removeWatch}) => (
  <DialogIconButton icon={EyeOff} label='Remove From Watch List' action={removeWatch}>
    {
      ({isDialogOpen, toggleDialog}) => (<ConfirmDialog
        open={isDialogOpen}
        onClose={toggleDialog}
        title='Remove Watch'
        content='Are you sure you want to remove the product watch?'
        action={removeWatch}
      />)
    }
  </DialogIconButton>
)
);
