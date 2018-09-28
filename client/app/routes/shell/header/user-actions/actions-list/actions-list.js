import React from 'react';
import {withStyles, IconButton, Menu, MenuItem, Divider} from '@material-ui/core';
import {compose, withState, withHandlers} from 'recompose';
import {AccountCircle} from 'mdi-material-ui';

const style = {
  accountIcon: {
    height: '36px',
    width: '36px'
  }
};

export default compose(
  withState('anchorButton', 'setAnchorButton', null),
  withHandlers({
    toggleMenu: ({anchorButton, setAnchorButton}) => ({currentTarget}) => {
      if (anchorButton) {
        setAnchorButton(null);

        return;
      }

      setAnchorButton(currentTarget);
    },
    logout: ({localLogout, toggleMenu}) => () => {
      localLogout();
      toggleMenu();
    }
  }),
  withStyles(style)
)(({classes: {accountIcon}, anchorButton, toggleMenu, logout}) => (
  <div>
    <IconButton onClick={toggleMenu}>
      <AccountCircle className={accountIcon} />
    </IconButton>
    <Menu
      anchorEl={anchorButton}
      open={Boolean(anchorButton)}
      onClose={toggleMenu}
    >
      <MenuItem onClick={toggleMenu}>Watch List</MenuItem>
      <MenuItem onClick={toggleMenu}>My account</MenuItem>
      <Divider />
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  </div>
));