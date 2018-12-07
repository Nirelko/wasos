import React from 'react';
import {withStyles, IconButton, Menu, MenuItem, Divider} from '@material-ui/core';
import {compose, withState, withHandlers} from 'recompose';
import {AccountCircle} from 'mdi-material-ui';
import {Link} from 'react-router-dom';

const style = {
  accountIcon: {
    height: '36px',
    width: '36px'
  },
  link: {
    textDecoration: 'none',
    outline: 'none'
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
)(({classes: {accountIcon, link}, anchorButton, toggleMenu, logout}) => (
  <div>
    <IconButton onClick={toggleMenu}>
      <AccountCircle className={accountIcon}/>
    </IconButton>
    <Menu
      anchorEl={anchorButton}
      open={Boolean(anchorButton)}
      onClose={toggleMenu}
    >
      <Link to='/watch-list' className={link}>
        <MenuItem onClick={toggleMenu}>Watch List</MenuItem>
      </Link>
      <MenuItem onClick={toggleMenu}>My account</MenuItem>
      <Divider/>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  </div>
));