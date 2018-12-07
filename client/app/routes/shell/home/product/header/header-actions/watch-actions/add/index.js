import React from 'react';
import {EyePlus} from 'mdi-material-ui';

import DialogIconButton from '../../../../../../../../../common/dialog-icon-button';
import WatchListAddDialog from './add-watch-dialog';


export default () => (
  <DialogIconButton icon={EyePlus} label='Add To Watch List'>
    {
      ({isDialogOpen, toggleDialog}) => (<WatchListAddDialog open={isDialogOpen} onClose={toggleDialog} />)
    }
  </DialogIconButton>
);
