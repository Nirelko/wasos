import React, {Fragment} from 'react';
import {withStyles, Dialog, Toolbar, IconButton, Typography} from '@material-ui/core';
import {compose} from 'recompose';
import {Close} from 'mdi-material-ui';
import {Flex, reflex} from 'reflexbox';

const FlexToolbar = reflex(Toolbar);

const styles = theme => ({
  toolbar: {
    background: theme.palette.primary[500],
    boxShadow: '0 1px 3px 0 rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12)'
  },
  titleContainer: {
    marginLeft: '8px'
  },
  title: {
    color: 'white'
  }
});

export default compose(
  withStyles(styles)
)(({classes: {toolbar, titleContainer, title}, open: isDialogOpen, onClose: handleClose, title: titleText, children}) => (
  <Fragment>
    {isDialogOpen &&
    <Dialog open={isDialogOpen} onClose={handleClose}>
      <FlexToolbar flex variant='dense' disableGutters className={toolbar}>
        <Flex auto className={titleContainer}>
          <Typography variant='h5' className={title}>{titleText}</Typography>
        </Flex>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </FlexToolbar>
      {children}
    </Dialog>
    }
  </Fragment>
));