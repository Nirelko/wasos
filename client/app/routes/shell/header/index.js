import React from 'react';
import {withStyles, AppBar} from '@material-ui/core';
import {Flex, reflex} from 'reflexbox';
import {compose} from 'recompose';
import {Link} from 'react-router-dom';

import ProductSearch from './product-search';
import UserActions from './user-actions';

const ToolBarStyle = theme => ({
  toolBar: {
    position: 'sticky',
    zIndex: 5,
    background: theme.palette.primary[500],
    color: 'rgba(255,255,255,.87)',
    height: '54px',
    borderRadios: '0 !important',
    flexDirection: 'column'
  },
  titleContainer: {
    marginLeft: '2%'
  },
  appIcon: {
    height: '54px',
    width: '54px'
  }
});

const FlexSearch = reflex(ProductSearch);
const logoUrl = 'http://up419.siz.co.il/up2/hjmdxnneqdz1.png';

export default compose(
  withStyles(ToolBarStyle)
)(({classes: {toolBar, titleContainer, appIcon}}) => (
  <AppBar className={toolBar}>
    <Flex align='center'>
      <Flex className={titleContainer} align='center' justify='center'>
        <Link to='/'>
          <img src={logoUrl} className={appIcon} />
        </Link>
      </Flex>
      <FlexSearch flex auto />
      <UserActions />
    </Flex>
  </AppBar>
));