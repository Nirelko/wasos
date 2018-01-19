import React from 'react';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import { Flex } from 'reflexbox';

import appIcon from '../../../assests/app-icon.png';

const ToolBarStyle = theme => ({
  toolBar: {
    position: 'unset',
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

export default withStyles(ToolBarStyle)(({ classes }) => (
  <Paper className={classes.toolBar}>
    <Flex className={classes.titleContainer}>
      <img src={appIcon} className={classes.appIcon} />
    </Flex>
  </Paper>
));