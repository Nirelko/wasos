import React from 'react';
import {withStyles} from '@material-ui/core';
import {compose} from 'recompose';

import ActionDialog from '../../action-dialog-template';

const styles = {
  sizeGuidePresenter: {
    height: '60vh',
    width: '450px',
    borderWidth: 0
  }
};

export default compose(
  withStyles(styles)
)(({classes: {sizeGuidePresenter}, sizeGuide, open: isDialogOpen, onClose: handleClose}) => (
  <ActionDialog open={isDialogOpen} onClose={handleClose} title='Asos Size Guides'>
    <iframe src={sizeGuide} className={sizeGuidePresenter} />
  </ActionDialog>
));