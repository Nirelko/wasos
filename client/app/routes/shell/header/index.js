import React from 'react';
import {withStyles, AppBar} from '@material-ui/core';
import {Flex, reflex} from 'reflexbox';
import {compose} from 'recompose';
import {Link} from 'react-router-dom';

import appIconSrc from '../../../../assests/app-icon.png';
import ProductSearch from './product-search';
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
    marginLeft: '2%'
  },
  appIcon: {
    height: '64px',
    width: '64px'
  }
});

const FlexSearch = reflex(ProductSearch);

export default compose(
  withStyles(ToolBarStyle)
)(({classes: {toolBar, titleContainer, appIcon}}) => (
  <AppBar className={toolBar}>
    <Flex align='center'>
      <Flex className={titleContainer} align='center' justify='center'>
        <Link to='/'>
          <img src={appIconSrc} className={appIcon}/>
        </Link>
      </Flex>
      <FlexSearch flex auto/>
      <CurrencyChooser/>
      <UserActions/>
    </Flex>
  </AppBar>
));