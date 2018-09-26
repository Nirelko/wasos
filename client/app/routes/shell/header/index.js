import React from 'react';
import {withStyles, AppBar, Button} from '@material-ui/core';
import {Flex} from 'reflexbox';
import {compose} from 'recompose';
import {Link} from 'react-router-dom';

import appIconSrc from '../../../../assests/app-icon.png';
import CurrencyChooser from './currency-chooser';
import UserActions from './user-actions';

const ToolBarStyle = theme => ({
  toolBar: {
    position: 'sticky',
    zIndex: 5,
    background: theme.palette.primary[500],
    color: 'rgba(255,255,255,.87)',
    height: '54px',
    borderRadios: '0 !important'
  },
  titleContainer: {
    marginLeft: '5%'
  },
  appIcon: {
    height: '64px',
    width: '64px'
  }
});

export default compose(
  withStyles(ToolBarStyle)
)(({classes: {toolBar, titleContainer, appIcon}}) => (
  <AppBar className={toolBar}>
    <Flex className={titleContainer} align='center'>
      <Flex auto>
        <img src={appIconSrc} className={appIcon} />
      </Flex>
      <CurrencyChooser />
      <UserActions />
    </Flex>
  </AppBar>
));