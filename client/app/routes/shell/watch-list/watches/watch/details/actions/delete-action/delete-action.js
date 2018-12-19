import React, {Fragment} from 'react';
import {compose, withHandlers} from 'recompose';
import {Button} from '@material-ui/core';

import WithDialog from '../../../../../../../../../common/with-dialog';
import ConfirmDialog from '../../../../../../../../../common/dialogs/confirm.dialog';


export default compose(
  withHandlers({
    removeWatch: ({username, productId, dispatchRemoveWatch}) => () => dispatchRemoveWatch(username, productId)
  })
)(({removeWatch, submitting}) => (
  <WithDialog>
    {
      ({isDialogOpen, toggleDialog}) => (
        <Fragment>
          <Button color='secondary' disabled={submitting} onClick={toggleDialog}>Delete</Button>
          <ConfirmDialog
            open={isDialogOpen}
            onClose={toggleDialog}
            title='Remove Watch'
            content='Are you sure you want to remove the product watch?'
            action={removeWatch}
          />
        </Fragment>
      )
    }
  </WithDialog>
))