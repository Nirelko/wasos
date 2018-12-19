import React from 'react';
import {withStyles} from '@material-ui/core';
import {compose, withHandlers} from 'recompose';
import {TrashCan} from 'mdi-material-ui';

import DialogIconButton from '../../../../../../common/dialog-icon-button';
import ConfirmDialog from '../../../../../../common/dialogs/confirm.dialog';

const style = {
  icon: {
    width: '30px',
    height: '30px'
  }
};

export default compose(
  withStyles(style),
  withHandlers({
    removeWatches: ({username, dispatchRemoveWatch, toggleMultiSelect}) => productsId => dispatchRemoveWatch(username, productsId, toggleMultiSelect)
  })
)(({classes: {icon}, onSubmit: handleSubmit, selectedWatches, removeWatches}) => (
  <DialogIconButton icon={TrashCan} classes={{icon}} label='Remove From Watch List' disabled={!Object.values(selectedWatches).filter(x => x).length}>
    {
      ({isDialogOpen, toggleDialog}) => (
        <ConfirmDialog
          open={isDialogOpen}
          onClose={toggleDialog}
          title='Remove Watches'
          content='Are you sure you want to remove the selected products watches?'
          action={handleSubmit(removeWatches)}
        />)
    }
  </DialogIconButton>
)
);
