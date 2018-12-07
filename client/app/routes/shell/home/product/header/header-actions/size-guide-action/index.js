import React from 'react';
import {Ruler} from 'mdi-material-ui';

import DialogIconButton from '../../../../../../../../common/dialog-icon-button';
import SizeGuidDialog from './size-guide-dialog';

export default () => (
  <DialogIconButton icon={Ruler} label='Size Guides'>
    {
      ({isDialogOpen, toggleDialog}) => (<SizeGuidDialog open={isDialogOpen} onClose={toggleDialog} />)
    }
  </DialogIconButton>
);